import { Component } from '@angular/core';
import { NavController, ViewController,LoadingController, AlertController, Platform } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service/posts-service';
import * as firebase from 'firebase';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

/*
Generated class for the PostAddPage page.
See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/

@Component({
    selector: 'page-post-add',
    templateUrl: 'post-add.html',
    providers: [PostsService]
})

export class PostAddPage {

    map: GoogleMap;

    private postTitle :any;
    private postBody :any;
    private userId :any;


    constructor(private navCtrl: NavController, private loadingCtrl: LoadingController,private viewCtrl: ViewController, private postsService: PostsService, private alertCtrl: AlertController, public platform: Platform ) {
        //user id of current logged in user
        this.userId = firebase.auth().currentUser.uid;
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    addNewPost(){

        //add preloader
        let loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: 'Reseting your password..'
        });
        loading.present();

        //call the service
        this.postsService.createPostService(this.userId, this.postBody).then(() => {

            //clear the fields
            this.postBody = "";

            //add toast
            loading.dismiss().then(() => {
                //show pop up
                let alert = this.alertCtrl.create({
                    title: 'Done!',
                    subTitle: 'Post successful',
                    buttons: ['OK']
                });
                alert.present();
            })

            //close the popup
            this.viewCtrl.dismiss();

        }, error => {
            //show pop up
            loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                    title: 'Error adding new post',
                    subTitle: error.message,
                    buttons: ['OK']
                });
                alert.present();
            })
        });
    }

    loadMap() {

        let location = new GoogleMapsLatLng(-34.9290,138.6010);

        this.map = new GoogleMap('map', {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'camera': {
                'latLng': location,
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
        });

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostsPage');
    }
}
