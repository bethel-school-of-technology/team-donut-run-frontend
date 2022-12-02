import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // User variable
  currentUser: User = new User();

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private authService: AuthService,) { }

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

  SearchPage() {
    this.closeMenu();
    this.navCtrl.navigateForward('search');
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  CheckCurrentUser() {
    // user real data & database
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        //public boolean observable used to modify dropdown menu.
        this.authService.active$ = this.authService.GetUserActiveState("active");
      }
      console.log('Current User: ', this.currentUser);
      console.log(this.currentUser.username)
    });
  }

  SignOut() {
    this.authService.signout();
    //change public boolean to false and modify dropdown menu.
    this.authService.active$ = this.authService.GetUserActiveState("");
    this.SignInPage();
  }
}

