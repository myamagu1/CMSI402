import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    public rootPage: any;
    // rootPage = LoginPage;


    constructor(platform: Platform) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAMDhxU69glVb2qkr_6JzsCprh9SXDdsFk",
            authDomain: "reppy-b9a64.firebaseapp.com",
            databaseURL: "https://reppy-b9a64.firebaseio.com",
            storageBucket: "reppy-b9a64.appspot.com",
            messagingSenderId: "721607679516"
        };
        firebase.initializeApp(config);


        var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            this.rootPage = TabsPage;
        } else {
            // No user is signed in.
            this.rootPage = LoginPage;
        }

        // firebase.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //         this.rootPage = TabsPage;
        //     } else {
        //
        //     }
        // });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}
