import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private userSvc: UserService, private router: Router, public modalController: ModalController) {}


  ngOnInit() {
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
