import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { LoginPage } from '../login/login';



/*
Generated class for the UsersDetail page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-users-detail',
    templateUrl: 'users-detail.html',
    providers: [UsersService]
})
export class UsersDetailPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersService ) {}

    logUserOut() {
        //   this.userService.logoutUser();
        this.usersService.logoutUser().then(() => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersDetailPage');
    }

}
