import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { UiModule } from '../ui/ui.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
