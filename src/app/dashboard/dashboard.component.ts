import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../ui/destroyable/destroyable.component';
import { Observable, ReplaySubject, map, of, switchMap } from 'rxjs';
import {
  BoardService,
  BoardsWithCount,
} from '../server/services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { Board } from '../server/models/board';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import { AuthService } from '../core/services/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends DestroyableComponent implements OnInit {
  private refreshSubject$ = new ReplaySubject<void>(1);
  public boards$: Observable<BoardsWithCount>;
  public currentUser: number;

  public count$: Observable<number>;

  private pageSize = 10;
  private pageIndex = 0;
  constructor(
    private boardService: BoardService,
    private dialog: MatDialog,
    authService: AuthService
  ) {
    super();

    this.currentUser = authService.getUserId() as number; // this cant be null
    this.boards$ = this.preventLeak(this.refreshSubject$).pipe(
      switchMap(() =>
        this.boardService.getBoards(
          '',
          this.pageIndex * this.pageSize,
          this.pageSize
        )
      )
    );

    this.count$ = this.boards$.pipe(
      map((boardsWithCount: BoardsWithCount) => boardsWithCount.total)
    );
  }

  ngOnInit() {
    this.refreshSubject$.next();
  }

  deleteBoard(id: number) {
    this.boardService.deleteBoardById(id).subscribe(() => {
      this.refreshSubject$.next();
    });
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

  editBoard(boardId: number) {
    this.boardService.getBoardById(boardId)
    .pipe(
      switchMap((board: Board) => {
        return this.dialog
          .open(CreateBoardDialogComponent, {
            width: '600px',
            data: { 
              board,
            },
          })
          .afterClosed();
      }),
      switchMap((board: Board) => {
        if (board) {
          return this.boardService.updateBoard({...board, id: boardId});
        }
        return of(null);
      })
    ).subscribe((created) => {
      if (created) {
        this.refreshSubject$.next();
      }
    });
  }

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshSubject$.next();
  }
}
