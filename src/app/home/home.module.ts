import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UiModule } from '../ui/ui.module';
import { BoardModule } from '../board/board.module';
import { NavigationModule } from '../navigation/navigation.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    BoardModule,
    NavigationModule,
    DashboardModule,
    RouterModule
  ]
})
export class HomeModule { }
