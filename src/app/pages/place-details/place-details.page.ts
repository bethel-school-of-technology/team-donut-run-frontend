import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { ResultsService } from 'src/app/Services/results.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  placeDetails: PlaceResult = new PlaceResult();
  place_id: string = '';
  constructor(private resultsService: ResultsService) {}

  ngOnInit() {
    //will need to get the current place_id based on the place clicked -- filler string
    this.place_id = 'ChIJletJO1lmZIgRq0UiSZV5AGM';
    this.findPlaceDetailsById(this.place_id);
  }

  findPlaceDetailsById(place_id) {
    this.resultsService.getResultsByID(place_id).subscribe((result) => {
      this.placeDetails = result[0];
      //printing results
      console.log(this.placeDetails);
      //save overview to place model
      this.placeDetails.overview = result[0].editorial_summary.overview;
      //save photo reference to place model
      this.placeDetails.photo_reference = result[0].photos[0].photo_reference;
      //save open now to place model
      this.placeDetails.open_now = result[0].opening_hours.open_now;
    });
  }
}
