import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../ui/destroyable/destroyable.component';
import { Observable, Subject, of, switchMap, tap } from 'rxjs';
import {
  BoardService,
  BoardsWithCount,
} from '../server/services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../server/models/board';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends DestroyableComponent implements OnInit {
  private refreshSubject$ = new Subject<void>();
  public boards$: Observable<BoardsWithCount>;
  constructor(private boardService: BoardService, private dialog: MatDialog) {
    super();
    this.boards$ = this.preventLeak(this.refreshSubject$).pipe(
      switchMap(() => this.boardService.getBoards())
    );

    this.refreshSubject$.next();
  }

  ngOnInit() {
    this.refreshSubject$.next();
  }

  deleteBoard(id: number) {
    // this.boardService.deleteBoard(id).subscribe(() => {
    //   this.boards$ = this.preventLeak(this.boardService.getBoards());
    // });
  }

  createBoard() {
    this.dialog
      .open(CreateBoardDialogComponent, {
        width: '600px',
      })
      .afterClosed()
      .pipe(
        switchMap((board: Board) => {
          if (board) {
            return this.boardService.createBoard(board);
          }
          return of(null);
        })
      )
      .subscribe((created) => {
        if (created) {
          this.refreshSubject$.next();
        }
      });
  }
}
