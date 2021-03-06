import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { NavController, ViewController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service/posts-service';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { Platform, Tabs } from 'ionic-angular';

declare var google;

@Component({
    selector: 'page-post-add',
    templateUrl: 'post-add.html',
    providers: [PostsService, Camera, Geolocation]
})

export class PostAddPage implements OnInit {

    @ViewChild('map') mapElement: ElementRef;
    private map: any;
    private address: any;
    private postBody: any;
    private userId: any;
    private imageSrc: any;
    private rate: any;
    private likePost: any;

    constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private viewCtrl: ViewController, private postsService: PostsService, private alertCtrl: AlertController, private modalCtrl: ModalController, private geolocation: Geolocation, private camera: Camera, private platform: Platform, private zone: NgZone) {
        //user id of current logged in user
        this.userId = firebase.auth().currentUser.uid;
        this.address = '';
        this.rate = 0;
        this.likePost = 0;
    }

    ngOnInit() {
        var y = firebase.database.ServerValue.TIMESTAMP;
        console.log(y);
    }

    showAddressModal() {
        let modal = this.modalCtrl.create(AutocompletePage);
        modal.onDidDismiss(data => {
            this.address = data;
        });
        modal.present();
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {
        let geolocation = new Geolocation();

        geolocation.getCurrentPosition().then((position) => {

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        }, (err) => {
            console.log(err);
        });
    }

    openGallery() {

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
                    .then(file_uri => this.imageSrc = file_uri,
                    err => console.log(err));
            }).then(() => {
                loading.dismiss().then(() => {
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

    addNewPost() {

        //add preloader
        let loading = this.loadingCtrl.create({
            dismissOnPageChange: true,
            content: 'Loading...'
        });

        loading.present().then(() => {
            //call the service
            return this.postsService.createPost(this.userId, this.postBody, this.imageSrc, this.address, this.rate, this.likePost);
        }).then(() => {
            this.zone.run(() => {
                //clear the fields
                this.postBody = "";
                this.imageSrc = "";
                this.address = "";
                this.rate = 0;
                this.likePost = 0;

                //add toast
                loading.dismiss().then(() => {
                    (<Tabs>this.navCtrl.parent).select(0);
                });
            });
        }, error => {
            //show pop up
            this.zone.run(() => {
                loading.dismiss().then(() => {
                    let alert = this.alertCtrl.create({
                        title: 'Error adding new post',
                        subTitle: error.message,
                        buttons: ['OK']
                    });
                    alert.present();
                });
            });
        });
    }
}


    // addMarker() {
    //
    //     let marker = new google.maps.Marker({
    //         map: this.map,
    //         animation: google.maps.Animation.DROP,
    //         position: this.map.getCenter()
    //     });
    //
    //     let content = "<h4>Information!</h4>";
    //
    //     this.addInfoWindow(marker, content);
    //
    // }
    //
    // addInfoWindow(marker, content) {
    //
    //     let infoWindow = new google.maps.InfoWindow({
    //         content: content
    //     });
    //
    //     google.maps.event.addListener(marker, 'click', () => {
    //         infoWindow.open(this.map, marker);
    //     });
    //
    // }