import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { RouterModule, Routes } from '@angular/router';
import { NewTeamComponent } from './new-team/new-team.component';

export const routes: Routes = [
  { path: '', component: TeamComponent }
];


@NgModule({
  declarations: [
    TeamComponent,
    NewTeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TeamModule { }
