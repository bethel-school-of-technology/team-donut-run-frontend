export class PlaceResult {
  placeId: string;
  name?: string;
  types?: string[];
  formatted_address?: string;
  rating?: number;
  price_level?: number;
  open_now?: boolean;
  website?: string;
  editorial_summary?: string;
  photos?: string[];
  business_status?: string;

  constructor(
    placeId: string,
    name?: string,
    types?: string[],
    formatted_address?: string,
    rating?: number,
    price_level?: number,
    open_now?: boolean,
    website?: string,
    editorial_summary?: string,
    photos?: string[],
    business_status?: string,
  ) {
    this.placeId = placeId;
    this.name = name;
    this.types = types;
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
