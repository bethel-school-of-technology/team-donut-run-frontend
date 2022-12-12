import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Experience } from 'src/app/models/experience';
import { PlaceResult } from 'src/app/models/place-result';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { ResultsService } from 'src/app/Services/results.service';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.page.html',
  styleUrls: ['./experience-details.page.scss'],
})
export class ExperienceDetailsPage implements OnInit {

  useAPI: boolean = true;
  useAPIPhotos: boolean = false;

  experienceDetails: Experience = new Experience();
  currentExperienceId: number;

  currentUser: User = new User();
  currentUserId: number;

  firstPlace: PlaceResult = new PlaceResult();
  secondPlace: PlaceResult = new PlaceResult();
  thirdPlace: PlaceResult = new PlaceResult();

  idArray: Array<any> = [];
  savedPlaces: Array<PlaceResult> = new Array<PlaceResult>;

  showOptions: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private expService: ExperienceService,
    private router: Router,
    private resultsService: ResultsService,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.getCurrentExperience();

    this.authService.getCurrentUser().subscribe(
      (response) => {
        if (response != null) {
          this.currentUser = response;
          this.currentUserId = response.userId;
          // console.log('Current User Id: ', this.currentUserId);
          if (this.currentUserId == this.experienceDetails.userId) {
            this.showOptions = true;
            console.log("Experience belongs to user");
          }
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

    
  }

  getCurrentExperience() {
    this.currentExperienceId = this.activatedRoute.snapshot.params['id'];
    this.expService.getExperienceById(this.currentExperienceId).subscribe(exp => {
      this.experienceDetails = exp;
      // console.log("Exp Details: ", this.experienceDetails);
      this.getExperiencePlaceDetails();
    }, error => {
      console.log("Experience Error: ", error);
    });
  }

  getExperiencePlaceDetails() {
    if (this.useAPI == true) {
      // use API and real data
      let id1 = this.experienceDetails.firstGooglePlaceId;
      let id2 = this.experienceDetails.secondGooglePlaceId;
      let id3 = this.experienceDetails.thirdGooglePlaceId;
      this.idArray.push(id1);
      if (id2) { this.idArray.push(id2);}
      if (id3) {this.idArray.push(id3);}

      for (let i = 0; i < this.idArray.length; i++) {
        this.getAPIPlaceDetails(this.idArray[i]).then((results: PlaceResult) => {
          let currentPlace = results;
          let typesArray: Array<any> = results.types;
          currentPlace.types = typesArray;

          if (this.useAPIPhotos == true) {
            let photoList: Array<any> = currentPlace.photos;
            let placePhoto = photoList[0].getUrl({
              maxWidth: 500,
              maxHeight: 500,
            });
            currentPlace.photo_reference = placePhoto;
          }
          
          this.savedPlaces.push(currentPlace);
        }, status => {
          console.log("API Results Status: ", status);
        })
      }
      console.log("Saved array: ", this.savedPlaces);

    } else {
      // use MOCK data
      let id1 = "ChIJE2FKt1hmZIgRaMGEIR4Qs-0";
      let id2 = "ChIJGVuc4xGGZIgR7fI2E4yqTpU";
      let id3 = "ChIJUfhVrKB5ZIgRdSNJy8Ng4ew";
      this.idArray.push(id1);
      if (id2) { this.idArray.push(id2);}
      if (id3) {this.idArray.push(id3);}
      
      for (let i = 0; i < this.idArray.length; i++) {
        this.resultsService.getPlaceDetailsByGooglePlaceId(this.idArray[i]).subscribe(result => {
          let currentPlace = result[0];
          currentPlace.types = result[0].types;

          this.savedPlaces.push(currentPlace);
        })
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
        'types',
        'formatted_address',
        'photos'
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


  // TO MARK AS COMPLETED
  toggleCompleted() {
    if (this.currentUserId == this.experienceDetails.userId) {
      if (this.experienceDetails.completed == false) {
        this.experienceDetails.completed = true;
        this.expService.updateExperience(this.experienceDetails).subscribe(() => {
          console.log("Place marked as completed");
        })
      } else if (this.experienceDetails.completed == true) {
        this.experienceDetails.completed = false;
        this.expService.updateExperience(this.experienceDetails).subscribe(() => {
          console.log("Place UNmarked as completed");
        });
      }
    } else {
      console.log("Not current user's experience; unable to mark as completed.");
    }
  }

  // TO DELETE EXPERIENCE
  deleteExperience() {
    if (this.currentUserId == this.experienceDetails.userId) {
      this.expService.deleteExperienceById(this.experienceDetails.experienceId).subscribe(() => {
        // Add window alert that experience has been deleted?
        console.log("Experience deleted.");
        this.router.navigate(['my-experiences']).then(() => {
          window.location.reload();
        });
      })
    } else {
      console.log("Not current user's experience. Unable to delete.");
    }
  }

}
