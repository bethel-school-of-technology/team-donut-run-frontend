import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';

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
    private alertController: AlertController,
    private toastController: ToastController,
    public menuService: MenuService
  ) {}

  ngOnInit() {}

  signin() {
    this.authService.signIn(this.username, this.password).subscribe(
      (response: any) => {
        console.log("myUserToken:", response);
        // this.presentToast();
        //use this public boolean observable to add current user to menu template.
        this.menuService.active$ = this.menuService.GetUserActiveState("active",this.username);
        this.router.navigateByUrl('/home').then(() => {
          this.presentToast()
          // .then(() => {
          //   window.location.reload();
          // })
        });
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login Successful',
      duration: 1200,
      position: 'bottom',
    });

    await toast.present();
  }
}
