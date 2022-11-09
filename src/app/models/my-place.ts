export class MyPlace {
    myPlaceId: number;
    visited: boolean;
    userId: number;
    createdOn: string;
    googlePlaceId: string;
    

    constructor(createdOn: string, googlePlaceId: string, myPlaceId?: number, visited?: boolean, userId?: number){
        this.myPlaceId = myPlaceId;
        this.visited = visited;
        this.userId = userId;
        this.createdOn = createdOn;
        this.googlePlaceId = googlePlaceId;
    }
}

