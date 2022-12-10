import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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

  useAPI: boolean = true;

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
    // get current user
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      this.currentUserId = user.userId;
      this.authService.currentUser$.next(user);
      // console.log('Current User: ', this.currentUser);
    });

    // get current user's experiences
    this.expService.getAllCurrentUserExperiences().subscribe(exp => {
      this.expService.myExperienceArray$.next(exp);
      console.log("Current User Experiences: ", this.myExperiencesArray);
    })

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.expService.myExperienceArray$.subscribe(array => {
      this.myExperiencesArray = array;
    })
  }

  CreateExperiencePage() {
    this.navCtrl.navigateForward('create-experience');
  }

  getPlaceDetails() {
    for (let i = 0; i <= this.myExperiencesArray.length-1; i++) {
      this.myExperiencesArray[i].firstPlaceName;
    }
  }

  // GET PLACE NAME
  getPlaceName(googlePlaceId: string) {
    this.getAPIPlaceDetails(googlePlaceId).then((results: PlaceResult) => {
      return results.name; 
    })
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
        'types', 
        // 'formatted_address', 
        // 'photos'
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
