import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NewProjectComponent } from './new-project/new-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewPhaseComponent } from './new-phase/new-phase.component';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MembersComponent } from './members/members.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';


export const routes: Routes = [
  { path: '', component: ProjectComponent },
  { path: ':idProject', component: ProjectDetailComponent }
];

@NgModule({
  declarations: [
    ProjectComponent,
    NewProjectComponent,
    ProjectDetailComponent,
    NewTaskComponent,
    NewPhaseComponent,
    MembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    FormsModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatTableModule,
  ]
})
export class ProjectModule { }
