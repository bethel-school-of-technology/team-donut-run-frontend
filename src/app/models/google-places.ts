export class GooglePlaces {
  googlePlaceId: string;
  placePhotos: string;
  placeType: string;
  placeName: string;
  placeAddress: string;
  placeHours: string;
  placeWebSite: string;
  placePhoneNumber: string;
  placeRatings: string;
  placePriceLevel: string;

  constructor(
  googlePlaceId: string,
  placePhotos: string,
  placeType: string,
  placeName: string,
  placeAddress: string,
  placeHours: string,
  placeWebSite: string,
  placePhoneNumber: string,
  placeRatings: string,
  placePriceLevel: string,
  ) {
    this.googlePlaceId = googlePlaceId;
    this.placePhotos = placePhotos;
    this.placeType = placeType;
    this.placeName = placeName;
    this.placeAddress = placeAddress;
    this.placeHours = placeHours;
    this.placeWebSite = placeWebSite;
    this.placePhoneNumber = placePhoneNumber;
    this.placeRatings = placeRatings;
    this.placePriceLevel = placePriceLevel;
  }
}


