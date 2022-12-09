import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  HomePage() {
    this.navCtrl.navigateForward('home');
  }

  ProfilePage() {
    this.navCtrl.navigateForward('my-account');
  }

  MyPlacesPage() {
    this.navCtrl.navigateForward('my-places');
  }

  SignInPage() {
    this.navCtrl.navigateForward('sign-in');
  }

  SearchPage() {
    this.navCtrl.navigateForward('search');
  }
}
