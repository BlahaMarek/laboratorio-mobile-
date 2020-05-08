import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../_shared/services/task.service';
import { Task } from '../_models/Task';
import { UserService } from '../_shared/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {
  taskItem = null;
  constructor(public modalController: ModalController, private taskSvc: TaskService, private userSvc: UserService) { }
  tasks = [];
  ngOnInit() {
    this.taskSvc.$myTasks.subscribe(data => {
      this.tasks = data;
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  save() {
    let newTask:Task = new Task();
    newTask.desc = this.taskItem;
    newTask.done = false;
    newTask.personRef = this.userSvc.user['user']._id;
    newTask.report = false;
    newTask.group = null;
    this.taskItem = null;
    this.addItem(newTask);
    this.modalController.dismiss();
  }

  addItem(task: Task) {
    this.taskSvc.createTask(task).subscribe(data => {
      this.tasks.push(data);
      this.taskSvc.setMyTasks(this.tasks);
    })
  }

}
