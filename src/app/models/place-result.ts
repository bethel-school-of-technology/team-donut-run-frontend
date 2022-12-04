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
  photos?: string[];
  photo_reference?: string;
  business_status?: string;
  short_address?: string;
  latitude?: number;
  longitude?: number;
  user_ratings_total?: number;
  
  constructor(
    place_id?: string,
    name?: string,
    types?: [],
    formatted_address?: string,
    rating?: number,
    price_level?: number,
    website?: string,
    business_status?: string,
    photo_reference?: string,
    user_ratings_total?: number
  ) {
    this.place_id = place_id;
    this.name = name;
    this.types = types;
    this.rating = rating;
    this.formatted_address = formatted_address;
    this.price_level = price_level;
    this.website = website;
    this.business_status = business_status;
    this.photo_reference = photo_reference;
    this.user_ratings_total = user_ratings_total
  }
}
