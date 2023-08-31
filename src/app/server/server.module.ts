import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './services/board.service';
import { CardService } from './services/card.service';
import { UserService } from './services/user.service';
import { ColumnService } from './services/column.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    BoardService,
    CardService,
    UserService,
    ColumnService
  ]
})
export class ServerModule { }
