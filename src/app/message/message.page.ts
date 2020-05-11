import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../_shared/services/user.service';
import { MessagingService } from '../_shared/services/messaging.service';
import { Message } from '../_models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild('scrollMe', {static: false}) scrollMe: ElementRef;
  @Input() person = null;
  messages = [];
  messageText = "";

  constructor(public modalController: ModalController, private userSvc: UserService, private messageSvc: MessagingService) { }
  

  ngOnInit() {
    if (!!this.person) {
      this.messageSvc.getMessages(this.userSvc.user['user'].login, this.person.login).subscribe(data => {
        this.messages = data;
      })

      this.messageSvc.socket.on('private_chat', (data) => {
        var username = data.username;
        var message = data.message;
        if (this.person.login == username) {
          this.messages.push(message);
        }
      });
    } else {
      this.messageSvc.getGroupMessages().subscribe(data => {
        this.messages = data;
      })
      
      this.messageSvc.socket.on('group', (msg) => {
        this.messages.push(msg);
      });
    }
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }
  
  scrollToBottom(): void {
    try {
        this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  dismiss() {
    this.modalController.dismiss();
  }

  send() {
    if (this.messageText.length == 0) {
      return;
    }
    const newMessage = new Message();
    newMessage.message = this.messageText;
    newMessage.from = this.userSvc.user['user'].login;

    if (!!this.person) {
      newMessage.to = this.person.login;
      this.messageSvc.postMessage(newMessage).subscribe(data => {
        this.messageSvc.socket.emit('private_chat', {
          to: this.person.login,
          message: newMessage
        });
      });
    } else {
      newMessage.to = 'group';
      this.messageSvc.postMessage(newMessage).subscribe(data => {
        this.messageSvc.socket.emit('group', newMessage);
      });
    }

    this.messages.push(newMessage);
    this.messageText = "";
  }

  getFormatedDate(date) {
    const newDate = new Date(date).toLocaleString('en-GB');
    return newDate;
  }

  get getName() {
    return !!this.person ? this.person.login : 'Skupina';
  }
}
