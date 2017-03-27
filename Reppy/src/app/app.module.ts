import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { RegisterPage } from '../pages/register/register';
import { UsersDetailPage } from '../pages/users-detail/users-detail';
import { PostAddPage } from '../pages/post-add/post-add';
import * as firebase from 'firebase';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        LoginPage,
        ResetPasswordPage,
        RegisterPage,
        UsersDetailPage,
        PostAddPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TabsPage,
        LoginPage,
        ResetPasswordPage,
        RegisterPage,
        UsersDetailPage,
        PostAddPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
