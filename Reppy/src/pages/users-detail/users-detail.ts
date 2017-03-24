import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';


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

    private userPhotoUrl: any;
    private userDislplayName: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersService ) {
        //current user id
        var myUserId = firebase.auth().currentUser.uid;
        this.displayUser(myUserId);
    }

    displayUser(theUserId){

        var that = this;

        this.usersService.viewUser(theUserId).then(snapshot => {

            //get user photo
            that.userPhotoUrl = snapshot.val().photo; //get user photo
            that.userDislplayName= snapshot.val().username;
        })
    }

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
