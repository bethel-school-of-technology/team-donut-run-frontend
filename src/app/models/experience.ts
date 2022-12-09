import { User } from "./user";

export class Experience {
    experienceId?: number;
    userId?: User['userId'];
    user?: User;
    completed?: boolean;
    experienceTitle?: string;
    experienceNotes?: string;
    experienceUserLocation?: string;
    createdOn?: string; // may take this out
    firstGooglePlaceId?: string;
    secondGooglePlaceId?: string;
    thirdGooglePlaceId?: string;
    firstPlaceName?: string;
    secondPlaceName?: string;
    thirdPlaceName?: string;


    constructor(
        experienceId?: number,
        userId?: User['userId'],
        user?: User,
        completed?: boolean,
        experienceTitle?: string,
        experienceNotes?: string,
        experienceUserLocation?: string,
        createdOn?: string, // may take this out
        firstGooglePlaceId?: string,
        secondGooglePlaceId?: string,
        thirdGooglePlaceId?: string,
    ) {
        this.experienceId = experienceId;
        this.userId = userId;
        this.user = user;
        this.completed = completed;
        this.experienceTitle = experienceTitle;
        this.experienceNotes = experienceNotes;
        this.experienceUserLocation = experienceUserLocation;
        this.createdOn = createdOn;
        this.firstGooglePlaceId = firstGooglePlaceId;
        this.secondGooglePlaceId = secondGooglePlaceId;
        this.thirdGooglePlaceId = thirdGooglePlaceId;
    }
}
