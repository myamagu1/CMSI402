import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { PostsService } from '../../providers/posts-service/posts-service';
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
    providers: [UsersService, PostsService]
})
export class UsersDetailPage {

    private userPostsLists= [];
    private userProfileLists: any;
    private userDisplayName: any;
    private userEmail: any;
    private userPhoto: any;
    private userId: any;

    private userPhotoUrl: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersService, private postsService: PostsService ) {
        //current user id
        var myUserId = firebase.auth().currentUser.uid;
        this.displayUser(myUserId);

        this.userProfileLists = firebase.database().ref('users');
        this.userId = firebase.auth().currentUser.uid;
        //get list of posts on page init
        this.listPosts();
    }

    displayUser(theUserId) {

        var that = this;

        this.usersService.viewUser(theUserId).then(snapshot => {

            //get user photo
            that.userPhotoUrl = snapshot.val().photo; //get user photo
            that.userDisplayName= snapshot.val().username;
        })
    }

    logUserOut() {
        //   this.userService.logoutUser();
        this.usersService.logoutUser().then(() => {
            this.navCtrl.setRoot(LoginPage);
        });
    }

    listPosts() {
        var that = this;
        this.postsService.listPostService().then(snapshot => {
            //empty this array first to avoid duplication of content when value changes in the database
            //so every time there is a change in the database, empty the array, fetch fresh data from db
            //this is because we are fetching data with on('value') inside listPostService()

            that.userPostsLists.length = 0;

            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                data['key'] = childSnapshot.key;
                that.userPostsLists.push(data);


                console.log("post details: "+that.userPostsLists);
                //get the user's detail
                that.usersService.viewUser(that.userId).then(snapshotUser=> {
                    that.userDisplayName = snapshotUser.val().username;
                    that.userEmail = snapshotUser.val().email;
                    that.userPhoto = snapshotUser.val().photo;

                    //check the console section of your browser inspect element
                    console.log( "user details: "+ snapshotUser.val() );
                })
            });
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersDetailPage');
    }

}
