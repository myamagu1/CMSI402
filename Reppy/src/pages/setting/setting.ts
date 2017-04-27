import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the Setting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class Setting implements OnInit{

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    console.log('Init called');
  }

  closeSetting() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Setting');
  }

}
