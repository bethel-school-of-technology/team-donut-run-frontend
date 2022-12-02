import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  newUser: User = new User();
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ionicForm = this.formBuilder.group({
      //not required fields to sign up
      firstName: [],
      lastName: [],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      //required fields to sign up
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      location: [],
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      this.newUser = this.ionicForm.value;
      this.authService.signUp(this.newUser).subscribe(
        () => {
          this.successfulLoginAlert();
          this.router.navigate(['sign-in']);
        },
        (error) => {
          this.unsuccessfulLoginAlert();
          console.log('Sign Up Error: ', error);
        }
      );
    }
  }

  async successfulLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Registration Successful',
      message: 'Your account has been created.',
      buttons: ['OK'],
    });
    await alert.present();
    console.log(this.newUser);
  }

  async unsuccessfulLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Try Again!',
      message: 'Your account could not be created.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
