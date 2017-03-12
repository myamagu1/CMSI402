import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //   this.emailField = "mondo@gmail.com";
  }

  submitLogin() {
      alert("Logged in");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
