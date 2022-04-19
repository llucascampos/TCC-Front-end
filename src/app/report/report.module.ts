import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule, Routes } from '@angular/router';

export const router: Routes = [
  {path: '', component: ReportComponent}
]

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ]
})

export class ReportModule { }
