import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UsersDetailPage } from '../pages/users-detail/users-detail';
import { PostAddPage } from '../pages/post-add/post-add';
import { SearchPage } from '../pages/search/search';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
// import * as firebase from 'firebase';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        LoginPage,
        UsersDetailPage,
        PostAddPage,
        SearchPage,
        AutocompletePage
    ],
    imports: [
        HttpModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        Ionic2RatingModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        LoginPage,
        UsersDetailPage,
        PostAddPage,
        SearchPage,
        AutocompletePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
