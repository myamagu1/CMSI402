import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, ViewController,LoadingController, AlertController, ModalController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service/posts-service';
import * as firebase from 'firebase';
import { Geolocation } from 'ionic-native';
import { AutocompletePage } from '../autocomplete/autocomplete';

/*
Generated class for the PostAddPage page.
See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/

declare var google;

@Component({
    selector: 'page-post-add',
    templateUrl: 'post-add.html',
    providers: [PostsService]
})

export class PostAddPage {

    @ViewChild('map') mapElement: ElementRef;
    private map: any;
    private address: any;
    private postTitle :any;
    private postBody :any;
    private userId :any;


    constructor(private navCtrl: NavController, private loadingCtrl: LoadingController,private viewCtrl: ViewController, private postsService: PostsService, private alertCtrl: AlertController, private modalCtrl: ModalController ) {
        //user id of current logged in user
        this.userId = firebase.auth().currentUser.uid;
        this.address = {
            place: ''
        };
    }

    showAddressModal () {
        let modal = this.modalCtrl.create(AutocompletePage);
        let me = this;
        modal.onDidDismiss(data => {
            this.address.place = data;
        });
        modal.present();
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        Geolocation.getCurrentPosition().then((position) => {

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
}
