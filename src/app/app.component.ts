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
    this.closeMenu();
    this.navCtrl.navigateForward('home');
  }
  ProfilePage() {
    this.closeMenu();
    this.navCtrl.navigateForward('my-account');
  }

  MyPlacesPage() {
    this.closeMenu();
    this.navCtrl.navigateForward('my-places');
  }

  SignInPage() {
    this.closeMenu();
    this.navCtrl.navigateForward('sign-in');
  }

  SearchPage() {
    this.closeMenu();
    this.navCtrl.navigateForward('search');
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}

