import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the List page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class List implements OnInit {

  private posts: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private zone: NgZone) {
  }

  ngOnInit() {
    //get list of posts on page init
    this.posts = [];
    this.listPosts();
    console.log('Init called');
  }

  closeListPage() {
    this.viewCtrl.dismiss();
  }

  listPosts() {
    firebase.database().ref('posts').on('child_added', snapshot => {
      console.log('Child added');

      let value = snapshot.val();

      firebase.database().ref(`users/${value.uid}`).once('value', snapshot => {
        value.user = snapshot.val();
        this.posts.push(value);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad List');
  }

}
