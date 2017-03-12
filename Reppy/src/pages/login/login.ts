import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

public emailField: any;
public passwordField: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private ModalCtrl: ModalController) {
    //   this.emailField = "mondo@gmail.com";
  }

  submitLogin() {
      alert("Logged in");
  }

  submitRegister() {
      let registerModal = this.ModalCtrl.create(RegisterPage);
      registerModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
