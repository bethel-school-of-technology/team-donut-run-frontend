import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuType: string = 'reveal';
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

