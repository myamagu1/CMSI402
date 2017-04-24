import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
Generated class for the ResetPassword page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-reset-password',
    templateUrl: 'reset-password.html'
})
export class ResetPasswordPage implements OnInit {

    public username: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.username = this.navParams.get('userdetails').name;
    }

    ngOnInit() {
        console.log('Init called');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetPasswordPage');
    }

}
