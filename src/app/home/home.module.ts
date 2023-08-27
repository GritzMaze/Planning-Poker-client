import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UiModule } from '../ui/ui.module';
import { BoardModule } from '../board/board.module';
import { NavigationModule } from '../navigation/navigation.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    BoardModule,
    NavigationModule
  ]
})
export class HomeModule { }
