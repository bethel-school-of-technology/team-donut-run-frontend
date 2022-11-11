import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signin() {
    this.authService.signIn(this.username, this.password).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log('Error: ', error);
        window.alert('Unsuccessful Login');
        this.router.navigateByUrl('/sign-in');
      }
    );
  }
}
