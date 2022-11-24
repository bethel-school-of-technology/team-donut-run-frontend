import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { ResultsService } from 'src/app/Services/results.service';
import { ActivatedRoute } from '@angular/router';
import { MyPlacesService } from 'src/app/services/my-places.service';

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
  currentPlace_id: string = '';

  // Place photos
  newPhoto = "";

  // Used to get all photo details from response
  photoList: Array<any>;

  // Used to get all URLs for photos (loop through in HTML to get all photos)
  photoLinkArray: string[] = [];

  // Use to limit the number of photos we get for each place (keep in mind each photo is 1 call, so 3 photos would be 3 calls)
  photoLimit: number = 1;
  photosExist: boolean = true;

  // Placeholder text while editorial_summary is not working
  placeOverview: string = "Lorem ipsum dolor amet mustache knausgaard +1, blue bottle waistcoat tbh semiotics artisan synth stumptown gastropub cornhole celiac swag. Brunch raclette vexillologist post-ironic glossier ennui XOXO mlkshk godard pour-over blog tumblr humblebrag. Blue bottle put a bird on it twee prism biodiesel brooklyn. Blue bottle ennui tbh succulents."

  constructor(
    private resultsService: ResultsService,
    private activatedRoute: ActivatedRoute,
    private myPlacesService: MyPlacesService
  ) {}

  ngOnInit() {
    this.getCurrentGooglePlaceId();
  }

  getCurrentGooglePlaceId() {
    this.currentPlace_id = this.activatedRoute.snapshot.params['id'];
    this.findPlaceDetailsByGooglePlaceId(this.currentPlace_id);
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
        console.log("Mock Place Details: ", this.placeDetails);
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

  // Work on later
  savePlaceToMyPlaces() {
    //get Google Place Id
    console.log("Google Place Id: ", this.currentPlace_id);

    //get current User Id

    //get current date
    var today = new Date();
    console.log(today);

    //has this user visited the current place?

  }

}
