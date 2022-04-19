import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'opções'];
  myControl = new FormControl();
  public users: Array<any> = [];
  public usersWithoutProject: Array<User> = [];
  public usersInProject: Array<User> = [];
  public formNewMember: any;
  filteredOptions: Observable<string[]>;
  idProject: number;

  constructor( 
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) 
    public data: any, ) { }

  ngOnInit(): void {
    this.idProject = this.data.idProject;
    this.getUsers()
    this .filteredOptions = this .myControl.valueChanges.pipe(
      startWith( '' ),
      map( value => ( typeof value === 'string' ? value : value.name)),
      map( name => (name ? this ._filter(name) : this .users.slice())),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(u => u.name.toLowerCase().includes(filterValue));
  }

  getUsers(){
    this.userService.getUser().subscribe((res)=> {
        this.users = res;
        this.usersWithoutProject = res.filter(u => u?.projectId == null);
        this.usersInProject = res.filter(u => u?.projectId == this.idProject);
        console.log(this.users)
    })
  }

  registerNewMember(){
    let updateProject = {
      idProject: this.idProject,
      idUser: this.myControl.value.id
    }

    this.userService.updateProject(updateProject).subscribe(res => {
      this.getUsers()
    })

  }

  removeMembers(user: number){
    let updateProject = {
      idProject: null,
      idUser: user
    }

    this.userService.updateProject(updateProject).subscribe(res => {
      this.getUsers()
    })
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

}
