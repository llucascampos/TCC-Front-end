import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NewPasswordComponent } from './new-password/new-password.component';
import {MatDialogModule} from '@angular/material/dialog';


export const routes: Routes = [
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [
    LoginComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
