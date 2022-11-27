import { User } from "./user";

export class MyPlace {
  myPlaceId?: number;
  visited?: boolean;
  userId?: User['userId'];
  user?: User;
  createdOn?: string;
  googlePlaceId?: string;

  constructor(
    myPlaceId?: number,
    googlePlaceId?: string,
    visited?: boolean,
    userId?: User['userId'],
    user?: User,
    createdOn?: string
  ) {
    this.myPlaceId = myPlaceId;
    this.visited = visited;
    this.userId = userId;
    this.createdOn = createdOn;
    this.googlePlaceId = googlePlaceId;
    this.user = user;
  }
}

