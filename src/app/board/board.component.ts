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
import { CardService } from '../server/services/card.service';
import { LoadingTracker } from '../shared/loading-tracker';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent extends DestroyableComponent implements OnInit {
  public columns$: Observable<Column[]>;
  private columnsSubject$ = new BehaviorSubject<Column[]>([]);

  private loadingTracker = new LoadingTracker();
  public loading$ = this.loadingTracker.isLoading$;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private cardService: CardService
  ) {
    super();
    this.columns$ = this.columnsSubject$.asObservable();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadingTracker.addLoadee(this.columnsSubject$, 'columns');

    this.preventLeak(this.boardService.getBoardById(id)).subscribe((board) => {
      this.columnsSubject$.next(board.columns);
    });

  }

  drop(event: CdkDragDrop<Card[]>) {
    console.log(event);
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

      const columnId = Number(event.container.id);
      const card = event.container.data[event.currentIndex];
      card.columnId = columnId;
      const update$ = this.cardService.updateCard(card);
      this.loadingTracker.addLoadee(update$, 'Updating Card');

      const subcription = update$.subscribe(() => {
        subcription.unsubscribe();
      })
    }
  }
}
