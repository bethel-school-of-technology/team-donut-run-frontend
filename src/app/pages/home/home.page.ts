import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { GeolocationService } from 'src/app/services/geolocation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  position: Position = null;

  constructor(private geoService: GeolocationService) { }

  ngOnInit() {
  }

  getGPS() {
    this.geoService.getCurrentPosition().subscribe(result => {

        this.position = result;
        console.log(this.position.coords.latitude);
        console.log(this.position.coords.longitude)
    });
  }
}
