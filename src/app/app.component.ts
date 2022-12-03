import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    private authService: AuthService
    ) {}

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

  SignOut() {
    this.authService.signout();
    console.log("User Signed Out");
    this.SignInPage();
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}

