import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UiModule } from '../ui/ui.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    RouterModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
