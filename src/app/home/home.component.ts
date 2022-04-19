import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoHome } from '../user/models/infoHome.model';
import { UserService } from '../user/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName: any;
  userEmail: any;
  userPerfil: any;
  userId: any;

  infoHome: InfoHome;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.userEmail = sessionStorage.getItem('emailUser');
    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    this.userPerfil = sessionStorage.getItem('perfilUser');
   }

  ngOnInit(): void {
    this.getInfo()
  
  }

  getInfo(){
    this.userService.getInfoHome(this.userId).subscribe(res => {
      this.infoHome = res;
      console.log(res)
    })
  }

  goProject(project: number){
    if(project != null){
      this.router.navigate([`/project/${project}`]);
    }
    
  }


}
