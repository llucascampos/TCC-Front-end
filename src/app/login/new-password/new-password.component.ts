import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {


  formNewPassword: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }


  createForm(){
    this.formNewPassword = new FormGroup({
      newPassword: new FormControl('', [Validators.required]), 
      newPassword2: new FormControl('', [Validators.required]),
     })
  }

  registerNewPassword(){
      if(this.formNewPassword.controls.newPassword.value == this.formNewPassword.controls.newPassword2.value){
        
        let updatePassword = {
          id: sessionStorage.getItem('userId'),
          newPassword: this.formNewPassword.controls.newPassword.value
        }
        
        this.userService.updatePassword(updatePassword).subscribe(res =>{

         }, first())
      }else {
        console.log(this.formNewPassword.controls)
      }

  }

}
