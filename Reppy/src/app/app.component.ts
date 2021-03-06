import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    private rootPage: any;

    constructor(platform: Platform, private zone: NgZone) {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAMDhxU69glVb2qkr_6JzsCprh9SXDdsFk",
            authDomain: "reppy-b9a64.firebaseapp.com",
            databaseURL: "https://reppy-b9a64.firebaseio.com",
            storageBucket: "reppy-b9a64.appspot.com",
            messagingSenderId: "721607679516"
        };
        firebase.initializeApp(config);

        firebase.auth().onAuthStateChanged(user => {
            this.zone.run(() => {
                if (user) {
                    this.rootPage = TabsPage;
                } else {
                    this.rootPage = LoginPage;
                }
            });
        });

        platform.ready().then(() => {
            let statusBar = new StatusBar();

            statusBar.styleDefault();
            // Splashscreen.hide();
        });
    }
}