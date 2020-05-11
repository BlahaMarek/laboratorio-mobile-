import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { MessagePage } from '../message/message.page';
import { MessagingService } from '../_shared/services/messaging.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private userSvc: UserService, private router: Router, public modalController: ModalController) {}

  ngOnInit() {
    this.userSvc.loadMyColaborators();
  }
  
  openChatModal(person=null) {
    this.presentModal(person);
  }

  async presentModal(person) {
    const modal = await this.modalController.create({
      component: MessagePage,
      componentProps: {person: person}
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
