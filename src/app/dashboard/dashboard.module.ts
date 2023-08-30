import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '../ui/ui.module';
import { RouterModule } from '@angular/router';
import { CreateBoardDialogComponent } from './create-board-dialog/create-board-dialog.component';
import { ColumnRowComponent } from './column-row/column-row.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    DashboardComponent,
    CreateBoardDialogComponent,
    ColumnRowComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    RouterModule,
    BrowserModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
