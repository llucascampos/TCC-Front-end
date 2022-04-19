import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NewPasswordComponent } from './login/new-password/new-password.component';
import { LoginService } from './login/service/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tcc-front';
  token = sessionStorage.getItem("token")
  showMenu = false;
  perfilUser: string | null;


  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(
    public loginService: LoginService,
    private cdref: ChangeDetectorRef,
    public dialog: MatDialog, 
    private observer: BreakpointObserver,
    private router: Router) {}

  ngOnInit(): void {

  }

  ngAfterContentChecked() {

    this.loginService.getMenu().subscribe(res => {
      this.showMenu = res;
      this.perfilUser = sessionStorage.getItem("userPerfil")
    })
    this.cdref.detectChanges();
    
     }

  // ngAfterViewInit() {
    
  //   if(this.showMenu){
  //     this.observer
  //     .observe(['(max-width: 800px)'])
  //     .pipe(delay(1))
  //     .subscribe((res) => {
  //       if (res.matches) {
  //         this.sidenav.mode = 'over';
  //         this.sidenav?.close();
  //       } else {
  //         this.sidenav.mode = 'side';
  //         this.sidenav?.open();
  //       }
  //     });
  //   }

  // }

  logOut(){
    sessionStorage.removeItem('token')
    this.router.navigate(['/login'])
    this.loginService.enableMenu(false);
  }

  openDialogUpdatePassword(){
    const dialogRef = this.dialog.open(NewPasswordComponent, {
      width: '50%',
    });
    dialogRef.afterClosed()
}

}
