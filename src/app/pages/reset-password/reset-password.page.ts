import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  token: string = null;
  password: string = "";
  confirmPassword: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,) { }

  ngOnInit() {

    this.token = this.route.snapshot.queryParams['token'];

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    //validate token by comparing to ResetToken and checking ResetTokenExpires
    //values in the database.
    this.authService.validateResetToken(this.token).subscribe(response => {
      console.log(response)
      window.alert("Your token is valid, proceed to change your password.");
    }, error => {
      console.log('Error: ', error)
      window.alert("Your token is NOT valid");
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('/forgot-password');
      }
    });
  }
    //reset the password by passing in the token from the email link along with the
    //password and confirmPassword values entered in the form.
  onSubmit() {
    this.authService.resetPassword(this.token, this.password, this.confirmPassword).subscribe(response => {
      console.log(response)
      window.alert("Password reset successful, you can now login.");
      this.router.navigateByUrl('/sign-in');
    }, error => {
      console.log('Error: ', error)
      //generic error message for now.  Can implement more complex validation later.
      window.alert("Reset Error: Password must be at least 6 characters and both fields must match");
      if (error.status === 401 || error.status === 403) {
      }
    });
  }


}
