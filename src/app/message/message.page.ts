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
    console.log(this.person);
    this.messageSvc.getMessages(this.userSvc.user['user'].login, this.person.login).subscribe(data => {
      this.messages = data;
      this.scrollToBottom();
    })
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
    newMessage.from = this.userSvc.user['user'].login;
    newMessage.to = this.person.login;
    newMessage.message = this.messageText;

    this.messageText = "";

    this.messageSvc.postMessage(newMessage).subscribe(data => {
      this.messages.push(data);
    });
  }

  getFormatedDate(date) {
    const newDate = new Date(date).toLocaleString('en-GB');
    return newDate;
  }
}
