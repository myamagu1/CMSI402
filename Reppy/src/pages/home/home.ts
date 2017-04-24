import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { PostsService } from '../../providers/posts-service/posts-service';
import { SearchPage } from '../search/search';
import * as firebase from 'firebase';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [PostsService, UsersService]
})

export class HomePage implements OnInit {

    private userPostsLists= [];
    private userProfileLists: any;
    private userDisplayName: any;
    private userEmail: any;
    private userPhoto: any;
    private userId: any;

    constructor(public navCtrl: NavController, private postsService: PostsService, private usersService: UsersService,  private zone: NgZone) {

        this.userProfileLists = firebase.database().ref('users');
        this.userId = firebase.auth().currentUser.uid;
        //get list of posts on page init
        this.listPosts();
    }

    ngOnInit() {
        console.log('Init called');
    }

    redirectToSearchPage(){

        //redirect here
        this.navCtrl.push(SearchPage);
    }
    //
    // redirectToPostAddPage(){
    //     //redirect here
    //     this.navCtrl.push(PostAddPage);
    // }

    listPosts(){
        this.postsService.listPostService().then(snapshot => {
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


                console.log("post details: "+ this.userPostsLists);
                //get the user's detail
                this.usersService.viewUser(this.userId).then(snapshotUser=> {
                    this.zone.run(() => {
                        this.userDisplayName = snapshotUser.val().username;
                        this.userEmail = snapshotUser.val().email;
                        this.userPhoto = snapshotUser.val().photo;
                    });

                    //check the console section of your browser inspect element
                    console.log( "user details: "+ snapshotUser.val() );
                })
            });
        });
    }

}