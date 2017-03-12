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
  // public rootPage: any = null;
  rootPage = LoginPage;
  

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

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            this.rootPage = TabsPage;
        } else {
            this.rootPage = LoginPage;
        }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
