import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import * as firebase from 'firebase';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {

    private posts: any[];

    constructor(public navCtrl: NavController, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        //get list of posts on page init
        this.posts = [];
        this.listPosts();
    }

    redirectToSearchPage() {
        //redirect here
        this.navCtrl.push(SearchPage);
    }

    // like() {
    //     let databaseRef = firebase.database().ref(`posts`).child('like');
    //     databaseRef.transaction(function (like) {
    //         if (like) {
    //             like = like + 1;
    //         }
    //         return (like || 0) + 1;
    //     });
    // }

    listPosts() {
        firebase.database().ref('posts').on('child_added', snapshot => {
            console.log('Child added');

            let value = snapshot.val();

            firebase.database().ref(`users/${value.uid}`).once('value', snapshot => {
                value.user = snapshot.val();
                this.posts.push(value);
                this.changeDetector.detectChanges();
            });
        });
    }

}