import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { Router } from '@angular/router';
import { TaskService } from '../_shared/services/task.service';
import { CalendarService } from '../_shared/services/calendar.service';
import { ModalController } from '@ionic/angular';
import { TaskPage } from '../task/task.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(
    private userSvc: UserService, 
    public taskSvc: TaskService, 
    public calendarSvc: CalendarService, 
    private router: Router,
    public modalController: ModalController
    ) {}

  ngOnInit() {
    this.taskSvc.loadMyTasks(this.userSvc.user['user']._id);
    this.taskSvc.loadLabTasks(this.userSvc.user['user']._id);
    this.taskSvc.loadReports(this.userSvc.user['user']._id);
    this.calendarSvc.loadMyCalendar(this.userSvc.user['user']._id);

  }

  formatString(item: String): String {
    if ( item.length > 30 ) {
      return item.substring(0, 30) + " ...";
    }

    return item;
  }

  openCalendarItem() {

  }

  done(id) {
    console.log(id)
    this.calendarSvc.doneItem(id);
  }

  addMyTask() {
    console.log("clicked");
    this.presentModal();
  }

  removeItem(item) {
    this.taskSvc.removeTask(item._id).subscribe(data => {
      this.taskSvc.loadMyTasks(this.userSvc.user['user']._id);
    });
  }

  doneItem(task) {
    this.taskSvc.doneTask(task._id).subscribe(data => {
      this.taskSvc.loadMyTasks(this.userSvc.user['user']._id);
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TaskPage
    });
    return await modal.present();
  }

  logoutUser() {
    this.userSvc.logoutUser().subscribe(() => {
      localStorage.removeItem('currentUser');
      this.userSvc.user = null;
      this.router.navigate(['/']);
    }, err =>{
      console.log('Nepodarilo sa odhlasit')
    })
  }

}
