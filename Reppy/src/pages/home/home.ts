import { Component } from '@angular/core';
import { UsersDetailPage } from '../users-detail/users-detail';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  redirectToUserDetailPage() {
      this.navCtrl.push(UsersDetailPage)
  }

}
