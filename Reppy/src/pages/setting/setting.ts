import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { PostsService } from '../../providers/posts-service/posts-service';
import * as firebase from 'firebase';

/**
 * Generated class for the Setting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [UsersService, PostsService]
})
export class Setting implements OnInit {

  private userPhoto: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private zone: NgZone, private usersService: UsersService, private postsService: PostsService) {
  }

  ngOnInit() {
    //current user id
    var myUserId = firebase.auth().currentUser.uid;
    this.displayUser(myUserId);
  }

  displayUser(userId) {
    this.usersService.viewUser(userId).then(snapshot => {

      //get user photo
      this.zone.run(() => {
        this.userPhoto = snapshot.val().photo;
      });
    });

    console.log('displayUser called');
  }

  logUserOut() {
    //   this.userService.logoutUser();
    this.usersService.logoutUser().then(() => {
      window.location.reload();
    });
  }

  closeSetting() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Setting');
  }

}
