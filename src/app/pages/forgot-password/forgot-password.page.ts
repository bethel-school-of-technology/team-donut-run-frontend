import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string = "";

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }
//Modified version of "forgot password feature" from:
//https://jasonwatmore.com/post/2020/08/29/angular-10-boilerplate-email-sign-up-
//with-verification-authentication-forgot-password#account-login-component-ts

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe( response => {
        console.log(response)
        window.alert("Check your email for a password reset link");
        // this.router.navigateByUrl('/my-account');
      }, error => {
        console.log('Error: ', error)
        if (error.status === 401 || error.status === 403) {
          this.router.navigateByUrl('/sign-in');
        }
      });
    }

}
