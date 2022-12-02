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
  currentUser: User = {};
  currentUserId: number;
  userExists: boolean;

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.currentUserId = user.userId;
      this.userExists = true;
      console.log("User Exists: ", this.userExists);
    }, error => {
      this.userExists = false;
      console.log("User Exists: ", this.userExists);
      console.log("User Error: ", error);
      if (error.status === 401 || error.status === 403) {
          console.log("reload")
        };
    });
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

  SignOut() {
    this.authService.signout();
    console.log("User Signed Out");
    window.location.reload();
  }

  SignUp() {
    this.navCtrl.navigateForward('sign-up');
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }
}

