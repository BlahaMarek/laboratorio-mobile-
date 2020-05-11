import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../_shared/services/messaging.service';
import { ToastController } from '@ionic/angular';
import { UserService } from '../_shared/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor( public toastController: ToastController, private messageSvc: MessagingService, private userSvc: UserService) {}

  ngOnInit() {
    this.messageSvc.emit('login', this.userSvc.user['user'].login);

    this.messageSvc.socket.on('private_chat', (data) => {
      var username = data.username;
      var message = data.message;
      this.presentToast('Nová správa od ' + username + '.')
    });

    this.messageSvc.socket.on('group', (msg) => {
      this.presentToast('Nová správa v spoločnej skupine. ');

    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 20000,
      position: 'top',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
