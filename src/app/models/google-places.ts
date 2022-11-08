export class GooglePlaces {
  googlePlaceId: string;
  name: string;
  type: string;
  address: string;
  photo: string;
  website: string;
  editorialSummary: string;

  constructor(
  googlePlaceId: string,
  name: string,
  type: string,
  address: string,
  photo: string,
  webSite: string,
  editorialSummary: string,
  ) {
    this.googlePlaceId = googlePlaceId;
    this.name = name;
    this.type = type;
    this.address = address;
    this.photo = photo;
    this.webSite = webSite;
    this.editorialSummary = editorialSummary;
  }
}


