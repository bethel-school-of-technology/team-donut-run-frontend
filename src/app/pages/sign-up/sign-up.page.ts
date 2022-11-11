import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  newUser: User = new User();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  signUp() {
    this.authService.signUp(this.newUser).subscribe(
      () => {
        window.alert('User Registered Successfully');
        this.router.navigate(['sign-in']);
      },
      (error) => {
        window.alert('User Registration Error');
        console.log('Error: ', error);
      }
    );
  }
}
