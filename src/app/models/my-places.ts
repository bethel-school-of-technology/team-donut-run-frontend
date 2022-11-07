export class MyPlaces {
    myPlacesId: number;
    visited: boolean;
    userId: number;
    createdOn: string;
    googlePlacesId: string;
    placesImages: string;
    placeName: string;
    city: string;
    state: string;
    starRating: string;

    constructor(createdOn?: string, googlePlacesId?: string,  myPlacesId?: number, visited?: boolean, userId?: number, placesImages?: string, placeName?: string, city?: string, state?: string, starRating?: string){
        this.myPlacesId = myPlacesId;
        this.visited = visited;
        this.userId = userId;
        this.createdOn = createdOn;
        this.googlePlacesId = googlePlacesId;
        this.placesImages = placesImages;
        this.placeName = placeName;
        this.city = city;
        this.state = state;
        this.starRating = starRating;

    }
}

