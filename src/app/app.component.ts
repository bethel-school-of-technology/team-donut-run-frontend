import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {}

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

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}

