import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
Generated class for the UsersService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {

    private data: any;
    public fireAuth: firebase.auth.Auth;
    public userProfile: any;

    constructor(public http: Http) {
        this.fireAuth = firebase.auth();
        this.userProfile = firebase.database().ref('users');
    }

    loadUser(number) {
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('https://randomuser.me/api/?results=' + number)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data.results;
                    resolve(this.data);
                })
        })
    }

    viewUser(userId: any) {
        var userRef = this.userProfile.child(userId);
        return userRef.once('value');
    }

    updateName(username: any) {
        return firebase.database().ref('/users')
            .child(firebase.auth().currentUser.uid).update({
                username: username
            });
    }

    updatePhoto(photo: any) {
        return firebase.database().ref('/users')
            .child(firebase.auth().currentUser.uid).update({
                photo: photo
            });
    }

    updateEmail(newEmail: string, password: string) {
        const credential = firebase.auth.EmailAuthProvider
            .credential(firebase.auth().currentUser.email, password);

        return firebase.auth().currentUser.reauthenticate(credential)
            .then(user => {
                firebase.auth().currentUser.updateEmail(newEmail).then(user => {
                    firebase.database().ref('/users')
                        .child(firebase.auth().currentUser.uid).update({ email: newEmail });
                });
            });
    }

    updatePassword(newPass: string, oldPassword: string): firebase.Promise<any> {
        const credential = firebase.auth.EmailAuthProvider
            .credential(firebase.auth().currentUser.email, oldPassword);

        return firebase.auth().currentUser.reauthenticate(credential)
            .then(user => {
                firebase.auth().currentUser.updatePassword(newPass).then(user => {
                    console.log("Password Changed");
                }, error => {
                    console.log(error);
                });
            });
    }

    signUpUser(email: string, password: string) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
            // sign in the user
            this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
                // successfully loged in and create user profile
                this.userProfile.child(authenticatedUser.uid).set({
                    email: email
                });
            });
        });
    }

    loginUser(email: string, password: string): any {
        if (!email) {
            return firebase.Promise.reject(new Error('Enter your email!'));
        } else if (!password) {
            return firebase.Promise.reject(new Error('Enter your password!'));
        } else {
            return this.fireAuth.signInWithEmailAndPassword(email, password);
        }
    }

    logoutUser() {
        firebase.database().ref('/users')
            .child(firebase.auth().currentUser.uid).off();

        return firebase.auth().signOut();
    }

    // logoutUser() {
    //     return this.fireAuth.signOut();
    // }

    showForgotPassword(email: any) {
        return this.fireAuth.sendPasswordResetEmail(email);
    }

    forgotPasswordUser(email: any) {
        return this.fireAuth.sendPasswordResetEmail(email);
    }

}
