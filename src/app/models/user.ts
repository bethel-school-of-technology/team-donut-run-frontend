import { MyPlace } from "./my-place";

export class User {
  userId?: number;
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  location?: string;

  myPlaces?: Array<MyPlace>;

  constructor(userId?: number, username?: string, email?: string, password?: string, firstName?: string, lastName?: string, location?: string, myPlaces?: Array<MyPlace>) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.location = location;
    this.myPlaces = myPlaces;
  }
}
