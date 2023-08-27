import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../ui/destroyable/destroyable.component';
import { Observable } from 'rxjs';
import { Board } from '../server/models/board';
import { BoardService } from '../server/services/board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends DestroyableComponent {
  
  public boards$: Observable<Board[]>;
    constructor(
      private boardService: BoardService
    ) {
      super();
      this.boards$ = this.preventLeak(this.boardService.getBoards());
    }

    deleteBoard(id: number) {
      // this.boardService.deleteBoard(id).subscribe(() => {
      //   this.boards$ = this.preventLeak(this.boardService.getBoards());
      // });
    }
}
