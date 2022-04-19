import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public id: number = 0;
  public component: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userServide: UserService) { }
 
  ngOnInit(): void {
    console.log(this.data)
    this.id = this.data.id
    this.component = this.data.component
  }


  delete() {
    switch(this.component){
      case 'user' :
        console.log(this.component)
        this.deleteUser(this.id);
      break
    }
  }

  deleteUser(id: number){
    this.userServide.deleteUser(id).subscribe(res => {
      console.log(res)
    })
  }

}
