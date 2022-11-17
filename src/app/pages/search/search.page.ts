import { Component, OnInit } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { PlaceResult } from 'src/app/models/place-result';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { ResultsService } from 'src/app/Services/results.service';
import SwiperCore, { SwiperOptions } from 'swiper';

// import {} from 'googlemaps';
declare var google;

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  // TESTING https://www.techiediaries.com/ionic-geolocation-google-maps-places-api-part-2/
  places: Array<any> ;

  // To get current geolocation
  position: Position = null;

  // These are current coordinates being pulled in from the geolocation
  currentLatitude: number = 35.8416001;
  currentLongitude: number = -86.8301986;

  // To display data results
  newPlace: PlaceResult = new PlaceResult();
  SearchResults: PlaceResult[] = [];

  // To use to easily switch between mock and API data
  useAPI: boolean = false;

  // Inputs for API Nearby Search method
  // For V2, we can let the user choose the radius and number of results?
  searchType: string = 'restaurant';
  searchRadius: number = 35000;
  // searchLimit: number = 3;


  // What is this used for? To carousel?
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  constructor(private resultsService: ResultsService, private geoService: GeolocationService) { };


  ngOnInit() {
    // To get current user's geolocation 
    // this.getGPS();

    // With API data, I don't think there will be anything in ngOnInit
    // this.searchAll();

    // Or using this...
    // this.toggleDataSource(this.useAPI);

    // TESTING API
    // this is not working when also in onit with getGPS
    // this.nearbySearchByGeolocation(this.currentLatitude, this.currentLongitude, this.searchType, this.searchRadius);
    this.setVariables(this.currentLatitude, this.currentLongitude);

    // this.getApiNearbySearchResults();
  }

  getGPS() {
    this.geoService.getCurrentPosition().subscribe((result) => {
      this.position = result;
      this.currentLatitude = this.position.coords.latitude;
      this.currentLongitude = this.position.coords.longitude;
      console.log("Current Latitude: " + this.currentLatitude);
      console.log('Current Longitude: ' + this.currentLongitude);
    });
  }

  // TESTING IONIC TUTORIAL
  getRestaurants(latLng) {
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    let request = {
      location : latLng,
      radius : 8047 ,
      types: ["restaurant"]
  };

  return new Promise((resolve,reject)=>{
    service.nearbySearch(request,function(results,status){
        if(status === google.maps.places.PlacesServiceStatus.OK)
        {
            resolve(results);    
        }else
        {
            reject(status);
        }

    }); 
  });
  }

  setVariables(lat, long) {
    let latLng = new google.maps.LatLng(lat, long);

    this.getRestaurants(latLng).then((results : Array<any>) => {
      this.places = results;
      console.log(this.places);
    }, (status) => console.log(status));
  }

  
  
  // TESTING IF WE COULD USE HTTP -- NOPE
  getApiNearbySearchResults() {
    this.resultsService.getApiNearbySearchResults().subscribe(results => {
      this.SearchResults = results;
      console.log(this.SearchResults);
    })
  }


  toggleDataSource (useAPI: boolean) {
    if (useAPI == true) {
    
      // use API endpoints
      
    } else {

      // use MOCK endpoints
      
    }
  }
  

  ////////// MOCK -- GET ALL RESULTS //////////
  searchAll() {
    this.SearchResults = [];
    this.resultsService.getAllResults().subscribe(ReturnedPlaces => {
      this.SearchResults = ReturnedPlaces;
      console.log(ReturnedPlaces);
    });
  }

  ////////// API -- NEARBY SEARCH RESULTS //////////
  // GET / Nearby Search (by current geolocation)
  nearbySearchByGeolocation(lat: number, lng: number, searchType: string, searchRadius: number) {

    var location = new google.maps.LatLng(lat, lng);

    var request = {
      location: location,
      radius: searchRadius,
      type: searchType,
    };

    let service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    
    service.nearbySearch(request, callback);

    function callback(results, status)  {
      // "result" is what returns the PlaceResult object, so we need to assign that data to a variable

      // let searchLimit = 3;
      let apiResults = [];

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // console.log('Status: ', google.maps.places.PlacesServiceStatus);
        // console.log('Callback Results: ', results);

        // This is limiting the results that we'll use BUT I don't think it's actually limiting the results that are returned (I don't think we can do that)
        // for (var i = 0; i < 3; i++) {
          // How to handle here if "business_status" is not 'operational'? This doesn't work for some reason.
          // if (results[i].business_status == 'OPERATIONAL') {
          //   limitedResults.push(results[i]);
          // }
          // apiResults.push(results[i]);

          let node1 = document.createTextNode(results[0].name);
          let node2 = document.createTextNode(results[1].name);
          let node3 = document.createTextNode(results[2].name);

          document.getElementById('resultsCard1').appendChild(document.createElement('p').appendChild(node1));

          document.getElementById('resultsCard2').appendChild(document.createElement('p').appendChild(node2));

          document.getElementById('resultsCard3').appendChild(document.createElement('p').appendChild(node3));
        // }

        // console.log('Callback Results: ', apiResults);
        // return apiResults;
        // let newPlace = new PlaceResult();
        // newPlace = results[0];
        // return results;
      }
      // console.log(apiResults);
      
      // return results;
    }
  }

}
