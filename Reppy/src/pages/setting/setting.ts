import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ViewController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { UsersService } from '../../providers/users-service/users-service';
import { PostsService } from '../../providers/posts-service/posts-service';
import { Camera } from '@ionic-native/camera';
import * as firebase from 'firebase';

/**
 * Generated class for the Setting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [UsersService, PostsService, Camera]
})
export class Setting implements OnInit {

  private userPhoto: any;
  private photo: any;

  constructor(public navCtrl: NavController, private camera: Camera, private loadingCtrl: LoadingController, public viewCtrl: ViewController, private zone: NgZone, private usersService: UsersService, private postsService: PostsService, private alertCtrl: AlertController, private platform: Platform) {
  }

  ngOnInit() {
    //current user id
    var myUserId = firebase.auth().currentUser.uid;
    this.displayUser(myUserId);
  }

  displayUser(userId) {
    this.usersService.viewUser(userId).then(snapshot => {

      //get user photo
      this.zone.run(() => {
        this.userPhoto = snapshot.val().photo;
      });
    });

    console.log('displayUser called');
  }

  logUserOut() {
    //   this.userService.logoutUser();
    this.usersService.logoutUser();
  }

  closeSetting() {
    this.viewCtrl.dismiss();
  }

  updatePhoto() {
    if (this.platform.is('cordova')) {

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Loading...'
      });

      let camera = new Camera();
      let cameraOptions = {
        sourceType: camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: camera.DestinationType.FILE_URI,
        quality: 100,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType: camera.EncodingType.JPEG,
        correctOrientation: true
      }


      loading.present().then(() => {
        return camera.getPicture(cameraOptions)
          .then(file_uri => this.photo = file_uri,
          err => console.log(err));
      }).then(() => {
        loading.dismiss().then(() => {
          this.usersService.updatePhoto(this.photo);
          //show pop up
          let alert = this.alertCtrl.create({
            title: 'Done!',
            buttons: ['OK']
          });
          alert.present();
        });
      });

    } else {
      alert("You're in browser!!!");
    }
  }

  updateName() {
    let alert = this.alertCtrl.create({
      message: "Add/Change Username",
      inputs: [
        {
          name: 'username',
          placeholder: 'username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.zone.run(() => {
              this.usersService.updateName(data.username);
              // (<Tabs>this.navCtrl.parent).select(2);
            });
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail() {
    let alert = this.alertCtrl.create({
      message: "Change Email",
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email',
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.usersService.updateEmail(data.newEmail, data.password);
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword() {
    let alert = this.alertCtrl.create({
      message: "Change Password",
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Reseting your password..'
            });
            loading.present();
            //call usersservice
            this.usersService.updatePassword(data.newPassword, data.oldPassword).then(() => {
              loading.dismiss().then(() => {
                //show pop up
                let alert = this.alertCtrl.create({
                  title: 'Check your email',
                  subTitle: 'Password reset successful',
                  buttons: ['OK']
                });
                alert.present();
              })
            }, error => {
              //show pop up
              loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                  title: 'Error resetting password',
                  subTitle: error.message,
                  buttons: ['OK']
                });
                alert.present();
              })
            });
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Setting');
  }

}
