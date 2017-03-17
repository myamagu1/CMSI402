import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
// import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { UsersService } from '../../providers/users-service/users-service';
// import * as firebase from 'firebase';


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
// private users = [];
private usersList : any;


 constructor(private alertCtrl: AlertController , private loadingCtrl: LoadingController, public navParams: NavParams, private navCtrl: NavController, private modalCtrl: ModalController, private usersService: UsersService) {
    //   this.emailField = "mondo@gmail.com";
    this.emailField = "";
    this.passwordField = "";
    this.listOurUsers();
 }

  signUserUp() {
      this.usersService.signUpUser(this.emailField, this.passwordField).then(authData => {
          // Successful
          this.navCtrl.setRoot(HomePage);
      }, error => {
        //   alert("error logging in: " + error.message);
      });

      let loader = this.loadingCtrl.create({
          dismissOnPageChange: true,
      });

      loader.present();
  }

  listOurUsers() {
      this.usersService.loadUser(10)
      .then(data => {
          this.usersList = data;
      })
  }


// Login
  submitLogin() {
    //   alert(this.passwordField);
      this.usersService.loginUser(this.emailField, this.passwordField).then(authData => {
          // Successful
          this.navCtrl.setRoot(HomePage);
      }, error => {
         // alert("error logging in: "+ error.message);
  		let alert = this.alertCtrl.create({
	      title: 'Error loggin in',
	      subTitle: error.message,
	      buttons: ['OK']
	    });
	    alert.present();
      });

      let loader = this.loadingCtrl.create({
          dismissOnPageChange: true,
      });

      loader.present();
  }

  submitRegister() {
    alert("Registered!");
    //   let registerModal = this.ModalCtrl.create(RegisterPage);
    //   registerModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
