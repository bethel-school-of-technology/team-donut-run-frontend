import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  currentUser: User = new User();

  constructor(private authService: AuthService) { }
  
  username: string = "bob";
  email:string = "BobTheSlob@gmail.com"
  firstName: string = "frank"
  lastName: string = "Synatra"
  location: string = "Area 51, USA"

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (response) => {
        if (response != null) {
          this.currentUser = response;
          // console.log('Current User: ', this.currentUser);
          
        } else {
          console.log('No active user signed in.');
        }
      },
      (error) => {
        console.log('Current User Error: ', error);
      }
    );
  }

}
