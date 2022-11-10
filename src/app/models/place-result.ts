export class PlaceResult {
  place_id?: string;
  name?: string;
  types?: [];
  formatted_address?: string;
  rating?: number;
  price_level?: number;
  opening_hours?: {};
  website?: string;
  overview?: string;
  photos?: [];
  photo_reference: string;
  business_status?: string;

  constructor(
    place_id?: string,
    name?: string,
    types?: [],
    formatted_address?: string,
    rating?: number,
    price_level?: number,
    opening_hours?: {},
    website?: string,
    photos?: [],
    business_status?: string
  ) {
    this.place_id = place_id;
    this.name = name;
    this.types = types;
    this.rating = rating;
    this.formatted_address = formatted_address;
    this.price_level = price_level;
    this.opening_hours = opening_hours;
    this.website = website;
    this.photos = photos;
    this.business_status = business_status;
  }
}
