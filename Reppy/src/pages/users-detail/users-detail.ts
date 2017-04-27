import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { PostsService } from '../../providers/posts-service/posts-service';
import { Setting } from '../setting/setting';
import * as firebase from 'firebase';


/*
Generated class for the UsersDetail page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-users-detail',
    templateUrl: 'users-detail.html',
    providers: [UsersService, PostsService]
})
export class UsersDetailPage implements OnInit {

    private userPostsLists = [];
    private userProfileLists: any;
    private userDisplayName: any;
    private userEmail: any;
    private userPhoto: any;
    // private userId: any;
    private userPhotoUrl: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersService, private postsService: PostsService, private zone: NgZone) {
        //current user id
        var myUserId = firebase.auth().currentUser.uid;
        this.displayUser(myUserId);

        this.userProfileLists = firebase.database().ref('users');
        //get list of posts on page init
        this.listPost(myUserId);

        console.log('Constructor finished');
    }

    ngOnInit() {
        console.log('Init called');
    }

    displayUser(theUserId) {
        this.usersService.viewUser(theUserId).then(snapshot => {

            //get user photo
            this.zone.run(() => {
                this.userPhotoUrl = snapshot.val().photo; //get user photo
                this.userDisplayName = snapshot.val().username;
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

    listPost(theUserId) {
        this.postsService.viewUsersPostsService(theUserId).then(snapshot => {
            //empty this array first to avoid duplication of content when value changes in the database
            //so every time there is a change in the database, empty the array, fetch fresh data from db
            //this is because we are fetching data with on('value') inside listPostService()

            this.userPostsLists.length = 0;

            snapshot.forEach(childSnapshot => {

                this.zone.run(() => {
                    var data = childSnapshot.val();
                    data['key'] = childSnapshot.key;
                    this.userPostsLists.push(data);
                });

                console.log("post details: " + this.userPostsLists);
                //get the user's detail
                this.usersService.viewUser(theUserId).then(snapshotUser => {
                    this.zone.run(() => {
                        this.userDisplayName = snapshotUser.val().username;
                        this.userEmail = snapshotUser.val().email;
                        this.userPhoto = snapshotUser.val().photo;
                    });

                    //check the console section of your browser inspect element
                    console.log("user details: " + snapshotUser.val());
                })
            });
        });

        console.log('listPost finished');
    }

    redirectToSetting() {
        //redirect here
        this.navCtrl.push(Setting);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersDetailPage');
    }

}
