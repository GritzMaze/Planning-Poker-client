import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './core/services/authguard.service';
import { AuthenticateComponent } from './ui/authenticate/authenticate.component';
import { CardComponent } from './board/card/card/card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'board/:id',
        component: BoardComponent,
      },
      {
        path: 'card/:id',
        component: CardComponent
      },
      {
        path: 'card',
        pathMatch: 'full',
        redirectTo: 'card/',
      }
    ],
  },
  {
    path: 'login',
    component: AuthenticateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
