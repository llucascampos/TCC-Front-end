import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../shared/delete/delete.component';
import { User } from './models/user.model';
import { NewUserComponent } from './new-user/new-user.component';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'telephone', 'perfil', 'projeto', 'options'];

  public users: Array<User> = [];
  public userEmailSearch: string = ''


  constructor(public dialog: MatDialog, public userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  openDialogNewUser(user: User = new User()) {
    const dialogRef = this.dialog.open(NewUserComponent, {
      height: '500px',
      width: '50%',
      data: {user}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() =>{
        this.getUsers();
      },500)
     
    });
  }

  openDialogDelete(user: User = new User()) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '50%',
      data: {id: user.id, component: 'user'}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() =>{
        this.getUsers();
      },500)
     
    });
  }

  getUsers(){
    this.userEmailSearch = '';
    this.userService.getUser().subscribe((res)=> {
        this.users = res;
        console.log(this.users)
    })
  }

  getUserByEmail() {
      this.userService.getUserByEmail(this.userEmailSearch).subscribe(res => {
        this.users = [];
        this.users.push(res)
      })
  }

}
