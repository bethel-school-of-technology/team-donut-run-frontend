import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { ResultsService } from 'src/app/Services/results.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyPlacesService } from 'src/app/services/my-places.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { MyPlace } from 'src/app/models/my-place';
import { AlertController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  // To use to easily switch between mock and API data
  // TRUE = using Google Data (so, use FALSE most of the time)
  useAPI: boolean = false;
  useAPIPhotos: boolean = false;

  // Place details variables
  placeDetails: PlaceResult = new PlaceResult();
  currentGooglePlaceId: string = '';

  // Used for place photos
  newPhoto = '';
  photoList: Array<any>;
  photoLinkArray: string[] = [];
  ChosenPhoto = '';

  // Use to limit the number of photos we get for each place (keep in mind each photo is 1 call, so 3 photos would be 3 calls)
  photoLimit: number = 2;
  photosExist: boolean = true;

  // User & My Place variables
  currentUser: User = new User();
  currentUserId: number;
  myGooglePlaceIds: string[] = [];
  userSavedPlace: boolean;
  currentMyPlace: MyPlace = new MyPlace();
  saveNewPlace: MyPlace = new MyPlace();

  // Placeholder text while editorial_summary is not working
  placeOverview: string =
    "This place has received great reviews from both locals and travelers alike. We think you'll love it! If not, let us know how we can finetune our search. We've done the work to filter through place recommendations to bring you the highest rated - and hopefully most fun - places in the area of your search. (This is custom placeholder text because the field that would provide this data isn't available from Google yet.)";

  constructor(
    private resultsService: ResultsService,
    private activatedRoute: ActivatedRoute,
    private placesService: MyPlacesService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getCurrentGooglePlaceId();

    this.authService.getCurrentUser().subscribe(
      (response) => {
        if (response != null) {
          this.currentUser = response;
          this.currentUserId = response.userId;
          console.log('Current User Id: ', this.currentUserId);

          this.checkIfSaved(this.currentGooglePlaceId);
          this.apiFindAllPlacesByUserId();
        } else {
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

  // Options for the category slider
  catSlideOpts = {
    loop: false,
    effect: 'slide',

    freeMode: true,
    freeModeSticky: false,

    slidesPerView: 'auto',
    spaceBetween: 10,
  };

  getCurrentGooglePlaceId() {
    this.currentGooglePlaceId = this.activatedRoute.snapshot.params['id'];
    this.findPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
  }

  // Find if current place exists in MyPlaces table for the given user
  checkIfSaved(googlePlaceId: string) {
    this.placesService.getPlaceByUserIdGoogleId(googlePlaceId).subscribe(
      (result) => {
        if (result == null || result == undefined) {
          this.userSavedPlace = false;
          console.log(`Found place = ${this.userSavedPlace}`);
        } else {
          this.userSavedPlace = true;
          this.currentMyPlace = result;
          console.log(
            `Found place ${this.currentMyPlace.myPlaceId} = ${this.userSavedPlace}`
          );
        }
      },
      (error) => {
        console.log('Check if Saved Error: ', error);
        // Not sure if we should handle any specific errors here, like 404 or 401 for unauthorized and route to sign in?
      }
    );
  }

  // To call service to get place details to display on the page
  findPlaceDetailsByGooglePlaceId(place_id) {
    if (this.useAPI == true) {
      // use API endpoints
      this.setAPIPlaceDetails(place_id);
    } else {
      // use MOCK endpoints
      this.resultsService
        .getSavedResultsByGooglePlaceId(place_id)
        .subscribe((result) => {
          this.ChosenPhoto = this.placeDetails = result[0];
          this.placeDetails.overview = result[0].editorial_summary.overview;
          this.placeDetails.open_now = result[0].opening_hours.open_now;
          // adding mock photos to the list
          this.photoLinkArray.push(
            'https://images.unsplash.com/photo-1669702055322-4813687f30c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80'
          );
          this.photoLinkArray.push(
            'https://plus.unsplash.com/premium_photo-1663945117081-69c28d66820c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
          );
          this.photoLinkArray.push(
            'https://images.unsplash.com/photo-1669817683129-869ca3c0bd3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
          );
          this.photoLinkArray.push(
            'https://images.unsplash.com/photo-1669721166543-de1035adc9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
          );
          this.ChosenPhoto = this.photoLinkArray[0];
        });
    }
  }

  ////////// GOOGLE API -- GET PLACE DETAILS //////////
  // This invokes the getDetails call from the Google Places API
  // Could this technically be placed into the Results Service if we wanted to?
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
        'website',
        'photos',
        // 'editorial_summary'
      ],
      // need to add "editorial_summary" back to this if it'll work?
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

  async setAPIPlaceDetails(googlePlaceId) {
    await this.getAPIPlaceDetails(googlePlaceId).then(
      (results: PlaceResult) => {
        this.placeDetails = results;
        // console.log('API Place Details: ', this.placeDetails);

        // To get place photos
        this.photoList = results.photos;

        if (this.photoList == null || this.photoList == undefined) {
          console.log('No photos exist');
          this.photosExist = false;
        } else {
          let maxPhotoLimit = this.photoList.length;

          if (this.photoLimit > maxPhotoLimit) {
            this.photoLimit = maxPhotoLimit;
          }

          if (this.useAPIPhotos == true) {
            for (let i = 0; i < this.photoLimit; i++) {
                this.newPhoto = this.photoList[i].getUrl({
                  maxWidth: 500,
                  maxHeight: 500,
                });
                this.photoLinkArray.push(this.newPhoto);
              }
          }

          this.ChosenPhoto = this.photoLinkArray[0];

          console.log('Max Photos: ', this.photoLimit);
          // console.log('Photo Links: ', this.photoLinkArray);
        }
      },
      (status) => console.log('API Status: ', status)
    );
  }

  // If user has NOT already saved a place
  // Do we want to add a window confirmation that they have to confirm to add or just add automatically?
  savePlaceToMyPlaces() {
    if (this.currentUserId != undefined) {
      // console.log('Going to add to My Places');
      this.saveNewPlace.googlePlaceId = this.currentGooglePlaceId;
      this.saveNewPlace.createdOn = 'Placeholder'; // this will autosave as a date on the backend
      
      this.placesService.saveNewMyPlace(this.saveNewPlace).subscribe(
        (result) => {
          console.log("New My Place: ", result);
          if (this.saveNewPlace.visited == true) {
            this.placeSavedAndVisitedAlert();
            this.userSavedPlace = true;
          } else {
            this.placeSavedAlert();
            this.userSavedPlace = true;
          }
          this.checkIfSaved(this.currentGooglePlaceId);
          // this.apiFindAllPlacesByUserId();

        },
        (error) => {
          console.log('Save Place Error: ', error);
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['sign-in']);
          }
        }
      );
    } else {

      this.signInToSavePlaceAlert();
      //this.router.navigate(['sign-in']);


    }

  }

  // If user HAS already saved a place
  // Do we want to add a window confirmation that they have to confirm to remove or just remove automatically?
  removePlacefromMyPlaces() {
    this.placesService
      .deleteMyPlaceByPlaceId(this.currentMyPlace.myPlaceId)
      .subscribe(
        () => {
          this.userSavedPlace = false;
          this.currentMyPlace.visited = false;
          this.placeRemovedFromSavedAlert();
        },
        (error) => {
          console.log('Remove Place Error: ', error);
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['sign-in']);
          }
        }
      );

    this.checkIfSaved(this.currentGooglePlaceId);
    // this.apiFindAllPlacesByUserId();
  }

  toggleVisited() {
    if (this.currentUserId != undefined) {
    if (this.userSavedPlace == false) {
      // saved false, visited false
      // save place AND mark as visited
      this.saveNewPlace.visited = true;
      this.savePlaceToMyPlaces();
      console.log("Saved AND Visited = true");
    } else if (
      this.userSavedPlace == true &&
      this.currentMyPlace.visited == false
    ) {
      // saved true, visited false
      // mark as visited
      this.currentMyPlace.visited = true;
      console.log("Visited = true");
      this.placesService.updateMyPlace(this.currentMyPlace).subscribe(
        () => {

          this.placeMarkedAsVisitedAlert();
          // this.apiFindAllPlacesByUserId();
        },
        (error) => {
          this.unableToMarkAsVisitedAlert();

          console.log('Update Place Error: ', error);
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['sign-in']);
          }
        }
      );
    } else if (
      this.userSavedPlace == true &&
      this.currentMyPlace.visited == true
    ) {
      // saved true, visited true
      // mark visited as false
      this.currentMyPlace.visited = false;
      console.log("Visited = false");
      this.placesService.updateMyPlace(this.currentMyPlace).subscribe(
        () => {

          this.placeRemovedFromVisitedAlert();
          // this.apiFindAllPlacesByUserId();
        },
        (error) => {
          this.unableToMarkAsVisitedAlert();

          console.log('Update Place Error: ', error);
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['sign-in']);
          }}
        );
        }
    } else {
      // Add window alert here that the user needs to sign in to visit
      this.signInToVisitPlaceAlert();
      //this.router.navigate(['sign-in']);
    }


  }

  PhotoClick(photo) {
    this.ChosenPhoto = photo;
    console.log('Chosen Photo: ', photo);
  }
  
    // To send data back to My Places page
  apiFindAllPlacesByUserId() {
    this.placesService.getAllCurrentUserPlaces().subscribe((result) => {
      this.placesService.myPlaceArray$.next(result);
    });
   }
   
  //Sign in Alerts
  async signInToVisitPlaceAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Please sign in to visit a place!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async signInToSavePlaceAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Please sign in to save a place!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  //Place Saved and Visited Alerts
  async placeSavedAndVisitedAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Place saved and marked as visited!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async placeSavedAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Place saved!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async placeRemovedFromSavedAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Place has been removed from saved places list!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async placeMarkedAsVisitedAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Place has been marked as visited!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async unableToMarkAsVisitedAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Unable to mark place as visited!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async placeRemovedFromVisitedAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Place has been removed from visited places list!',
      buttons: ['OK'],
    });
     await alert.present();
   }
}
