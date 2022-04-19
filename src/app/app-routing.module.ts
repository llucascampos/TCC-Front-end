import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/AuthGuard';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
  {path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule), canActivate: [AuthGuard]},
  {path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard]},
  {path: 'teams', loadChildren: () => import('./team/team.module').then(m => m.TeamModule), canActivate: [AuthGuard]},
  {path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
  {path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule), canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
