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

      var allContents = {
          name: 'Mondo',
          viewer: 'Ryoma',
          randNumber: '05051993'
      }

      this.navCtrl.push(ResetPasswordPage, {
          userdetails: allContents
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
