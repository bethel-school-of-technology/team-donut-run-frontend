import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  username: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  signin() {
    this.authService.signIn(this.username, this.password).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.log('Error: ', error);
        this.presentAlert();
        this.router.navigateByUrl('/sign-in');
      }
    );
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Your email or password is incorrect!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
