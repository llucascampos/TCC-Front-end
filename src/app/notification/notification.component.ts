import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: Observable<Array<Notification>>;

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotification();
  }


  getNotification(){
      this.notifications = this.notificationService.getNotification(sessionStorage.getItem('userId') || '')
       this.notificationService.getNotification(sessionStorage.getItem('userId') || '').subscribe(res => {
         console.log(res)
       })
  }

}
