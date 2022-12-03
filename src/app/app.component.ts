import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // User variable
  currentUser: string = '';

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public menuService: MenuService, private authService: AuthService) { }

  ngOnInit() {
    this.CheckCurrentUser();
  }

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

  SignUpPage() {
    this.closeMenu();
    this.navCtrl.navigateForward('sign-up');
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

  CheckCurrentUser() {
    // user real data & database
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user.username;
      if (this.currentUser) {
        //public boolean observable used to modify dropdown menu.
        this.menuService.active$ = this.menuService.GetUserActiveState("active",this.currentUser);
      }
      console.log('Current User: ', this.currentUser);
    });
  }

  SignOut() {
    this.authService.signout();
    //change active state to false and remove currentUser to modify dropdown menu.
    this.menuService.active$ = this.menuService.GetUserActiveState("","");
    this.SignInPage();
  }
}

