import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NewUserRequest } from '../models/new-user-request.model';
import { Perfil } from '../models/perfil.model';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  
  title: string = 'Cadastrar novo usuario';
  textButton: string = 'Cadastrar';
  formNewUser: any;
  perfis: Array<Perfil> = [];
  users: Array<User>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userServide: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getPerfil();

    if(this.data.user.id){
      this.createForm(this.data.user);
      this.title = "Atualizar usuario";
      this.textButton = "Atualizar";
    } else {
      this.createForm(new User());
    }

    this.getUsers();
    
  }

  createForm(newUserRequest: User){
    this.formNewUser = new FormGroup({
      id: new FormControl(newUserRequest.id), // apenas para editar
      name: new FormControl(newUserRequest.name, [Validators.required]),
      email: new FormControl(newUserRequest.email, [Validators.required, Validators.email]),
      perfilUser: new FormControl(newUserRequest.perfilUser, [Validators.required]),
      telephoneNumber: new FormControl(newUserRequest.telephoneNumber, [Validators.required]),
    })

  }

  getUsers(){
    this.userServide.getUser().subscribe(res => {
      this.users = res;
    })
  }


  getPerfil(){
    this.userServide.getPerfil().subscribe(res => {
      this.perfis = res;
    })
  }

  registerNewUser(){
    if(this.formNewUser.valid){      
     let user = this.users.find(u=> u.email == this.formNewUser.value.email)

     if(user && this.textButton != "Atualizar"){
      this.dialog.open(AlertComponent, {
        data: {
          message: 'Já existe um usuario com esse e-mail cadastrado.',
        },
      })
  
     }else {
      this.userServide.registerNewUser(this.formNewUser.value).subscribe(res => {
        this.formNewUser.reset();
      })
      } 
    }
      

    
  }

}
