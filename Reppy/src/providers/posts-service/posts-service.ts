import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import * as moment from 'moment';

/*
Generated class for the PostsService provider.
See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostsService {

    // private data: any;
    private userNode: any;
    private fireRef: any;
    private postsNode: any;
    private usersPostsNode: any;
    private time: any;
    private likePost: any;

    constructor(private http: Http) {
        this.userNode = firebase.database().ref('users');
        this.postsNode = firebase.database().ref('posts');
        this.usersPostsNode = firebase.database().ref('user-posts');
        this.fireRef = firebase.database().ref();
        this.time = firebase.database.ServerValue.TIMESTAMP;
        this.likePost = 0;
    }

    //view a certain Post
    viewPostService(postId: any) {
        var userRef = this.postsNode.child(postId);
        return userRef.once('value');
    }

    //view all posts made by this userId
    viewUsersPostsService(userId: any) {
        var userRef = this.usersPostsNode.child(userId);
        return userRef.once('value');
    }

    like(like: any) {
        return firebase.database().ref('/posts')
            .child(firebase.auth().currentUser.uid).update({
                like: this.likePost
            });
    }

    listPostService() {
        return this.postsNode.once('value');
    }

    createPost(userId: any, postBody: any, imageSrc: any, address: any, rate: any, likePost: any) {
        if (!postBody) {
            return firebase.Promise.reject(new Error('You need to type something'));
        } else if (!address) {
            return firebase.Promise.reject(new Error('You need to select a restaurant!'));
        } else if (!rate) {
            return firebase.Promise.reject(new Error('You need to rate the restaurant!'));
        } else {
            // A post entry.
            let postData = {
                uid: userId,
                body: postBody,
                img: imageSrc || null,
                address: address,
                rate: rate,
                // time: moment(this.time).startOf('day').fromNow()
                time: moment(this.time).format('LL'),
                like: likePost
            };

            // Get a key for a new Post.
            let newPostKey = this.postsNode.push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            let updatePath = {};
            updatePath['/posts/' + newPostKey] = postData;
            updatePath['/user-posts/' + userId + "/" + newPostKey] = postData;

            //update both tables simultaneously
            return this.fireRef.update(updatePath);
        }
    }
}
