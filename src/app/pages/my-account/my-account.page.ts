import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  constructor() { }
username: string = "bob";
email:string = "BobTheSlob@gmail.com"
firstName: string = "frank"
lastName: string = "Synatra"
location: string = "Area 51, USA"

  ngOnInit() {
  }

}
