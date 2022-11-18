import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}
  
  HomePage(){
    console.log("I am alive in Jesus!")
    this.navCtrl.navigateForward('home');
  }
    
  ProfilePage(){
    console.log("I am alive in Jesus!")
    this.navCtrl.navigateForward('my-account');
  }
    
  MyPlacesPage(){
    console.log("I am alive in Jesus!")
    this.navCtrl.navigateForward('my-places');
  }
   
  SignInPage(){
    console.log("I am alive in Jesus!")
    this.navCtrl.navigateForward('sign-in');
  }

  SearchPage(){
    console.log("I am alive in Jesus!")
    this.navCtrl.navigateForward('search');
  }
}
