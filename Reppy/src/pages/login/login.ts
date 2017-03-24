import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController, ViewController } from 'ionic-angular';
// import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
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
    private users = [];
    private usersList : any;


    constructor(private alertCtrl: AlertController , private loadingCtrl: LoadingController, public navParams: NavParams, private navCtrl: NavController, private modalCtrl: ModalController, private usersService: UsersService, private viewCtrl: ViewController) {
        //   this.emailField = "mondo@gmail.com";
        this.emailField = "";
        this.passwordField = "";
        this.listOurUsers();
    }

    signUserUp() {
        this.usersService.signUpUser(this.emailField, this.passwordField).then(authData => {
            // Successful
            this.navCtrl.setRoot(TabsPage);

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
            this.navCtrl.setRoot(TabsPage);
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

    showForgotPassword() {
        let prompt = this.alertCtrl.create({
            title: 'Enter Your Email',
            message: "An email will be sent to your Primary Email address that includes a password reset link.",
            inputs: [
                {
                    name: 'recoverEmail',
                    placeholder: 'you@example.com'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: data => {
                        //add preloader
                        let loading = this.loadingCtrl.create({
                            dismissOnPageChange: true,
                            content: 'Reseting your password..'
                        });
                        loading.present();
                        //call usersservice
                        this.usersService.forgotPasswordUser(data.recoverEmail).then(() => {
                            //add toast
                            loading.dismiss().then(() => {
                                //show pop up
                                let alert = this.alertCtrl.create({
                                    title: 'Check your email',
                                    subTitle: 'Password reset successful',
                                    buttons: ['OK']
                                });
                                alert.present();
                            })
                        }, error => {
                            //show pop up
                            loading.dismiss().then(() => {
                                let alert = this.alertCtrl.create({
                                    title: 'Error resetting password',
                                    subTitle: error.message,
                                    buttons: ['OK']
                                });
                                alert.present();
                            })
                        });
                    }
                }
            ]
        });
        prompt.present();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

}
