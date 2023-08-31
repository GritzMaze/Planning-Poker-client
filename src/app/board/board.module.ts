import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { BoardComponent } from './board.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card/card/card.component';


@NgModule({
  declarations: [
    BoardComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DragDropModule,
    RouterModule
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
