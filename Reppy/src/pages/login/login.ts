import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UsersService } from '../../providers/users-service/users-service';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersService]
})
export class LoginPage {

public emailField: any;
public passwordField: any;
public users = [];
public usersList: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private ModalCtrl: ModalController, private usersService: UsersService) {
    //   this.emailField = "mondo@gmail.com";
    this.listOurUsers();
  }

  listOurUsers() {
      this.usersService.loadUser(10)
      .then(data => {
          this.usersList = data;
      })
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
