import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';

/*
Generated class for the Search page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {

    userRef: any;
    userList: any;
    loadedUserList: any;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
        this.userRef = firebase.database().ref('users');

        this.userRef.on('value', userList => {
            let users = [];
            userList.forEach( user => {
                users.push(user.val());
            });

            this.userList = users;
            this.loadedUserList = users;
        });
    }

    initializeItems(): void {
        this.userList = this.loadedUserList;
    }

    getItems(searchbar) {
        // Reset items back to all of the items
        this.initializeItems();
        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;
        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }
        this.userList = this.userList.filter((v) => {
            if(v.username && q) {
                if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                    return true;
                }
                return false;
            }
        });
        console.log(q, this.userList.length);
    }

    closeSearchPage() {
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchPage');
    }

}
