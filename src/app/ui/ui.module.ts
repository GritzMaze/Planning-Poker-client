import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { TagComponent } from './tag/tag.component';



@NgModule({
  declarations: [
    CardComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    CommonModule,
    MatCardModule,
    CardComponent,
    TagComponent
  ]
})
export class UiModule { }
