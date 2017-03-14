import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  closeRegisterPage() {
      this.viewCtrl.dismiss();
  }

  RedirectToResetPage() {
      this.navCtrl.push(ResetPasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
