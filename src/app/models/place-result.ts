export class PlaceResult {
  place_id?: string;
  name?: string;
  types?: [];
  formatted_address?: string;
  rating?: number;
  price_level?: number;
  open_now?: boolean;
  website?: string;
  overview?: string;
  photos?: [];
  photo_reference?: string;
  business_status?: string;

  constructor(
    place_id?: string,
    name?: string,
    types?: [],
    formatted_address?: string,
    rating?: number,
    price_level?: number,
    website?: string,
    business_status?: string
  ) {
    this.place_id = place_id;
    this.name = name;
    this.types = types;
    this.rating = rating;
    this.formatted_address = formatted_address;
    this.price_level = price_level;
    this.website = website;
    this.business_status = business_status;
  }
}
