import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';
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

  constructor(
    private geoService: GeolocationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.getGPS();
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
}

