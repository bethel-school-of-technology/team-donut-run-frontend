import { Component, OnInit } from '@angular/core';
import { PlaceResult } from 'src/app/models/place-result';
import { ResultsService } from 'src/app/Services/results.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  placeDetails: PlaceResult = new PlaceResult();
  currentPlace_id: string = '';

  constructor(
    private resultsService: ResultsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCurrentGooglePlaceId();
  }

  getCurrentGooglePlaceId() {
    this.currentPlace_id = this.activatedRoute.snapshot.params['id'];
    this.findPlaceDetailsByGooglePlaceId(this.currentPlace_id);
  }

  findPlaceDetailsByGooglePlaceId(place_id) {
    this.resultsService
      .getSavedResultsByGooglePlaceId(place_id)
      .subscribe((result) => {
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
