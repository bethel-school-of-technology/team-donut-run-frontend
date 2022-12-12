import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { PlaceResult } from 'src/app/models/place-result';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-my-experiences',
  templateUrl: './my-experiences.page.html',
  styleUrls: ['./my-experiences.page.scss'],
})
export class MyExperiencesPage implements OnInit {

  useAPI: boolean = false;

  myExperiencesArray: Experience[] = [];

  // User variables
  currentUser: User = new User();
  currentUserId: number;

  placeName: string;

  constructor(
    private expService: ExperienceService, 
    public navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (response) => {
        if (response != null) {
          this.currentUser = response;
          this.currentUserId = response.userId;
          console.log('Current User Id: ', this.currentUserId);

          this.getCurrentUserExperiences();

        } else {
          console.log('No active user signed in.');
          this.navCtrl.navigateForward('sign-in');
        }
      },
      (error) => {
        console.log('Current User Error: ', error);
      }
    );

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.expService.myExperienceArray$.subscribe(array => {
      this.myExperiencesArray = array;
    });

  }

  CreateExperiencePage() {
    this.navCtrl.navigateForward('create-experience');
  }

  getCurrentUserExperiences() {
    this.expService.getAllCurrentUserExperiences().subscribe(exp => {
      this.myExperiencesArray = exp;
      this.expService.myExperienceArray$.next(exp);
      console.log("Current User Experiences: ", this.myExperiencesArray);
        this.getExperiencePlaceNames();
    });
  }

  // There's probably a way to make this more concise, but for time's sake, this works!
  getExperiencePlaceNames() {
    for (let i = 0; i <= this.myExperiencesArray.length-1; i++) {
      let id1 = this.myExperiencesArray[i].firstGooglePlaceId;
      let id2 = this.myExperiencesArray[i].secondGooglePlaceId;
      let id3 = this.myExperiencesArray[i].thirdGooglePlaceId;
      
      if (this.useAPI == true) {
        this.getAPIPlaceDetails(id1).then((results: PlaceResult) => {
          this.myExperiencesArray[i].firstPlaceName = results.name;
        });

        if (id2) {
        this.getAPIPlaceDetails(id2).then((results: PlaceResult) => {
          this.myExperiencesArray[i].secondPlaceName = results.name;
        });}

        if (id3) {
        this.getAPIPlaceDetails(id3).then((results: PlaceResult) => {
        this.myExperiencesArray[i].thirdPlaceName = results.name;
      });}

      } else {
        this.myExperiencesArray[i].firstPlaceName = "Mock Place 1";

        if (id2) {
          this.myExperiencesArray[i].secondPlaceName = "Mock Place 2";
        }

        if (id3) {
          this.myExperiencesArray[i].thirdPlaceName = "Mock Place 3";
        }
      }
    }
  }

  getAPIPlaceDetails(googlePlaceId: string) {
    var service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    var request = {
      placeId: googlePlaceId,
      fields: [
        'place_id', 
        'name', 
      ],
    };

    return new Promise((resolve, reject) => {
      service.getDetails(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
          console.log('Place Details Response Error: ', status);
        }
      });
    });
  }
  

}
