import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DestroyableComponent } from '../ui/destroyable/destroyable.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { BoardService } from '../server/services/board.service';
import { Card } from '../server/models/card';
import { Column } from '../server/models/column';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends DestroyableComponent implements OnInit {
  public columns$: Observable<Column[]>;
  private columnsSubject$ = new BehaviorSubject<Column[]>([]);

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {
    super();
    this.columns$ = this.columnsSubject$.asObservable();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.preventLeak(this.boardService.getBoardById(id)).subscribe((board) => {
      console.log(board.columns);
      this.columnsSubject$.next(board.columns);
    });
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(this.columnsSubject$.value);
  }
}
