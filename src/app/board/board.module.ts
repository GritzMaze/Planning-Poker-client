import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { BoardComponent } from './board.component';


@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    DragDropModule,
  ],
  exports: [
    BoardComponent
  ]
})
export class BoardModule { }
