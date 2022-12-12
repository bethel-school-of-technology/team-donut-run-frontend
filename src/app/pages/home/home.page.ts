import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { GeolocationService } from 'src/app/services/geolocation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  position: Position = null;
  //These are current coordinates being pulled in from the geolocation
  currentLatitude: number = null;
  currentLongitude: number = null;

  currentUser: User = new User();
  currentUserId: number;

  constructor(
    private geoService: GeolocationService,
    public navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    // this.getGPS(); // make this a subject?

    this.authService.getCurrentUser().subscribe(
      (response) => {
        if (response != null) {
          this.currentUser = response;
          this.currentUserId = response.userId;
          this.authService.currentUser$.next(response);
          console.log('Current User Id: ', this.currentUserId);
        } else {
          this.currentUser = null;
          console.log('No active user signed in.');
        }
      },
      (error) => {
        console.log('Current User Error: ', error);
      }
    );

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getGPS() {
    this.geoService.getCurrentPosition().subscribe((result) => {
      this.position = result;
      this.currentLatitude = this.position.coords.latitude;
      this.currentLongitude = this.position.coords.longitude;
      console.log('Current Latitude: ' + this.currentLatitude);
      console.log('Current Longitude: ' + this.currentLongitude);
    });
  }

  SearchPage() {
    this.navCtrl.navigateForward('search');
  }

  CreateExperiencePage() {    
    if (this.currentUser != undefined || this.currentUser != null) {
      this.navCtrl.navigateForward('create-experience');
      // console.log("User?: ", this.currentUser);

    } else {
      this.loginToBuildExperienceAlert();
      this.navCtrl.navigateForward('sign-in');
      // console.log("No User?: ", this.currentUser);
    }
  }

  async loginToBuildExperienceAlert() {
    const alert = await this.alertController.create({
      header: 'Login Required',
      message: 'You must sign in to build an experience.',
      buttons: ['OK'],
    });
    await alert.present();
 }
}

