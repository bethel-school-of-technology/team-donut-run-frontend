export class PlaceResult {
  name: string;
  type: string[];
  formatted_address: string;
  rating: string;
  price_level: number;
  open_now: boolean;
  website: string;
  editorial_summary: string;
  photos: string[];
  business_status: string;

  constructor(
    name: string,
    type: string[],
    formatted_address: string,
    rating: string,
    price_level: number,
    open_now: boolean,
    website: string,
    editorial_summary: string,
    photos: string[],
    business_status: string,
  ) {
    this.name = name;
    this.type = type;
    this.rating = rating;
    this.formatted_address = formatted_address;
    this.price_level = price_level;
    this.open_now = open_now;
    this.website = website;
    this.editorial_summary = editorial_summary;
    this.photos = photos;
    this.business_status = business_status;
  }
}
