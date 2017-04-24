import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
Generated class for the Autocomplete page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
declare var google;

@Component({
    selector: 'page-autocomplete',
    templateUrl: 'autocomplete.html'
})
export class AutocompletePage implements OnInit {
    private autocompleteItems: any;
    private autocomplete: any;
    service = new google.maps.places.AutocompleteService();

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private zone: NgZone) {
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }
        
    ngOnInit() {
        console.log('Init called');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    chooseItem(item: any) {
        this.viewCtrl.dismiss(item);
    }

    updateSearch() {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let me = this;
        this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'US'} }, function (predictions, status) {
            me.autocompleteItems = [];
            me.zone.run(function () {
                predictions.forEach(function (prediction) {
                    me.autocompleteItems.push(prediction.description);
                });
            });
        });
    }

    closeSearchPage() {
        this.viewCtrl.dismiss();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AutocompletePage');
    }

}
