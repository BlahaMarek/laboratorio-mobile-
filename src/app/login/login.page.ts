import { Component, OnInit } from '@angular/core';
import { UserService } from '../_shared/services/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: string = null;
  password: string = null;

  constructor(private userSvc: UserService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!!user) {
      this.userSvc.user = user;
        this.router.navigate(['tabs/tab1']);
    }
  }

  loginUser() {
    let user = {
      login: this.login,
      password: this.password
    }
    this.userSvc.loginUser(user).subscribe(data => {
      console.log(data)
      this.router.navigate(['tabs/tab1']);
    }, (err) => {
      this.presentToast("Nesprávne prihlasovacie údaje");
    })


  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
