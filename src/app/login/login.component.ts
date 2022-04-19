import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { User } from '../user/models/user.model';
import { LoginRequest } from './models/login.model';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() user = new EventEmitter();
  
  formLogin: any
  hide = true;
  userLogged!: User;
  

  constructor(
    public loginService: LoginService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm(new LoginRequest())
  }

  createForm(login: LoginRequest){
    this.formLogin = new FormGroup({
      email: new FormControl(login.email, [Validators.required, Validators.email]),
      password: new FormControl(login.password, [Validators.required])
    })
  }

  login(){
    console.log(this.formLogin.value)
    this.loginService.login(this.formLogin.value).pipe(first()).subscribe(res =>{

      if(sessionStorage.getItem('token')){
        this.loginService.enableMenu(true)
        this.router.navigate(['/home'])
      }

    }, error => {
      this.dialog.open(AlertComponent, {
        data: {
          message: 'E-mail ou senha incorreta',
        },
      })
    })
  }


}
