import { Component } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private userSvc: UserService, private router: Router) {}

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
