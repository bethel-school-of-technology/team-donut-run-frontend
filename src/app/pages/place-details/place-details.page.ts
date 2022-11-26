import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { ResultsService } from 'src/app/Services/results.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyPlacesService } from 'src/app/services/my-places.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { MyPlace } from 'src/app/models/my-place';

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

  // Place details variables
  placeDetails: PlaceResult = new PlaceResult();
  currentGooglePlaceId: string = '';

  // Used for place photos
  newPhoto = "";
  photoList: Array<any>;
  photoLinkArray: string[] = [];

  // Use to limit the number of photos we get for each place (keep in mind each photo is 1 call, so 3 photos would be 3 calls)
  photoLimit: number = 1;
  photosExist: boolean = true;

  // User & My Place variables
  currentUser: User = new User();
  currentUserId: number;
  myGooglePlaceIds: string[] = [];
  userSavedPlace: boolean;
  // currentMyPlaceId: number; // We may not need this
  currentMyPlace: MyPlace = new MyPlace();
  saveNewPlace: MyPlace = new MyPlace();

  // Placeholder text while editorial_summary is not working
  placeOverview: string = "Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag. Brunch raclette vexillologist post-ironic glossier ennui XOXO mlkshk godard pour-over blog tumblr humblebrag. Blue bottle put a bird on it twee prism biodiesel brooklyn. Blue bottle ennui tbh succulents."

  constructor(
    private resultsService: ResultsService,
    private activatedRoute: ActivatedRoute,
    private placesService: MyPlacesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentGooglePlaceId();

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.currentUserId = user.userId;
      // console.log("Current User: ", this.currentUser);
    });

    this.checkIfSaved(this.currentGooglePlaceId);

    // Add this to easily toggle between mock and real data
    // if (this.useAPI == true) {
    //   // user real data & database
    //   this.authService.getCurrentUser().subscribe(user => {
    //       this.currentUser = user;
    //       this.currentUserId = user.userId;
    //       console.log("Current User: ", this.currentUser);
    //     });

    // } else {
    //   // use mock data
    //   // this.currentUserId = 4;
    // }
  }

  getCurrentGooglePlaceId() {
    this.currentGooglePlaceId = this.activatedRoute.snapshot.params['id'];
    this.findPlaceDetailsByGooglePlaceId(this.currentGooglePlaceId);
  }

  // I don't think we need this after all!
  // Do we first need to get a list of all the saved google place ids and then compare the passed in google id to that list?
  // apiFindAllPlacesByUserId() {
  //   this.placesService.getAllCurrentUserPlaces().subscribe((result) => {
  //     for (let i = 0; i < result.length; i++) {
  //       let addId = result[i].googlePlaceId
  //       this.myGooglePlaceIds.push(addId);
  //     }
  //     console.log('Google Place Id Results: ', this.myGooglePlaceIds);
  //   });
  // }

  // Find if current place exists in MyPlaces table for the given user
  checkIfSaved(googlePlaceId: string) {
    this.placesService.getPlaceByUserIdGoogleId(googlePlaceId).subscribe((result) => {
        if (result == null || result == undefined) {
          this.userSavedPlace = false;
          this.currentMyPlace = null;
          console.log(`Did not find place = ${this.userSavedPlace}`);
        } else {
          this.userSavedPlace = true;
          this.currentMyPlace = result;
          console.log(`Found place ${this.currentMyPlace.myPlaceId} = ${this.userSavedPlace}`);
        }
    }, error => {
      console.log("Check if Saved Error: ", error);
      // Not sure if we should handle any specific errors here, like 404 or 401 for unauthorized and route to sign in?
    })
  }

  
  // To call service to get place details to display on the page
  findPlaceDetailsByGooglePlaceId(place_id) {
    if (this.useAPI == true) {
      // use API endpoints
      this.setAPIPlaceDetails(place_id);

    } else {
      // use MOCK endpoints
      this.resultsService.getSavedResultsByGooglePlaceId(place_id)
      .subscribe((result) => {
        this.placeDetails = result[0];
        //printing results
        // console.log("Mock Place Details: ", this.placeDetails);
        //save overview to place model
        this.placeDetails.overview = result[0].editorial_summary.overview;
        //save photo reference to place model
        // this.placeDetails.photo_reference = result[0].photos[0].photo_reference;
        //save open now to place model
        this.placeDetails.open_now = result[0].opening_hours.open_now;
      });
    }
  }

   ////////// GOOGLE API -- GET PLACE DETAILS //////////
  // This invokes the getDetails call from the Google Places API
  // This could technically be placed into the Results Service if we wanted to 
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
        if (status === google.maps.places.PlacesServiceStatus.OK)
        {
          resolve(results);
        } else {
          reject (status);
          console.log("Place Details Response Error: ", status);
        }
      });
    });
  }

  setAPIPlaceDetails(googlePlaceId) {
    this.getAPIPlaceDetails(googlePlaceId).then(
      (results: PlaceResult) => {
        this.placeDetails = results;
        console.log("API Place Details: ", this.placeDetails);

        // To get place photos
        this.photoList = results.photos;

        if (this.photoList == null || this.photoList == undefined) {
          console.log("No photos exist");
          this.photosExist = false;
        } else {
          let maxPhotoLimit = this.photoList.length;

          if (this.photoLimit > maxPhotoLimit) {
            this.photoLimit = maxPhotoLimit;
          }

          for (let i = 0; i < this.photoLimit; i++) {
            this.newPhoto = this.photoList[i].getUrl({ maxWidth: 500, maxHeight: 500 }); 
            this.photoLinkArray.push(this.newPhoto);
          }
          
          console.log("Max Photos: ", this.photoLimit);
          console.log("Photo Links: ", this.photoLinkArray);
        }
        
      }, (status) => console.log("API Status: ", status)
    );
  }


  // If user has NOT already saved a place
  // Do we want to add a window confirmation that they have to confirm to add or just add automatically?
  savePlaceToMyPlaces() {
    console.log("Going to add to My Places");
    // var today = new Date(); // I think this is set automatically
    this.saveNewPlace.googlePlaceId = this.currentGooglePlaceId;
    this.saveNewPlace.createdOn = "Placeholder"; // this will autosave as a date on the backend

    console.log("New Place Details: ", this.saveNewPlace);

    this.placesService.saveNewMyPlace(this.saveNewPlace).subscribe(() => {
      if (this.saveNewPlace.visited == true) {
        window.alert("Place saved and marked as visited!");
      } else {
        window.alert("Place saved!");
      }
     
      window.location.reload();
    }, error => {
      console.log("Save Place Error: ", error);
      // if (error.status === 401 || error.status === 403) {
      //   this.router.navigate(['signin'])};
    });

  }

  // If user HAS already saved a place
  // Do we want to add a window confirmation that they have to confirm to remove or just remove automatically?
  removePlacefromMyPlaces() {
    this.placesService.deleteMyPlaceByPlaceId(this.currentMyPlace.myPlaceId).subscribe(() => {
      window.location.reload();
      window.alert("Place has been removed from saved places list.")
    }, error => {
      console.log("Remove Place Error: ", error);
      if (error.status === 401) {
        this.router.navigate(['signin']);
      }
    })
  }

  toggleVisited() {    
    if (this.userSavedPlace == false) {
      // saved false, visited false
      // save place AND mark as visited
      this.saveNewPlace.visited = true;
      this.savePlaceToMyPlaces();

    } else if (this.userSavedPlace == true && this.currentMyPlace.visited == false) {
      // saved true, visited false
      // mark as visited
      this.currentMyPlace.visited = true;
      this.placesService.updateMyPlace(this.currentMyPlace).subscribe(() => {
        window.alert("Place has been marked as visited!");
        // window.location.reload();
      }, error => {
        window.alert("Unable to mark as visited.")
        console.log("Update Place Error: ", error);
        // if (error.status === 401) {
        //   this.router.navigate(['signin']);
        // }
      });

    } else if (this.userSavedPlace == true && this.currentMyPlace.visited == true) {
      // saved true, visited true
      // mark visited as false
      this.currentMyPlace.visited = false;
      this.placesService.updateMyPlace(this.currentMyPlace).subscribe(() => {
        window.alert("Place has been removed as visited!");
        // window.location.reload();
      }, error => {
        window.alert("Unable to mark as visited.")
        console.log("Update Place Error: ", error);
        // if (error.status === 401) {
        //   this.router.navigate(['signin']);
        // }
      });
    }
  }

}
