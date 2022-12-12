import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';

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
    public menuService: MenuService,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {}

  signin() {
    this.authService.signIn(this.username, this.password).subscribe(
      (response: any) => {
        // console.log("myUserToken:", response);
        // this.presentToast();
        //use this public boolean observable to add current user to menu template.
        this.menuService.active$ = this.menuService.GetUserActiveState("active",this.username);
        this.navCtrl.navigateForward('/home')
        .then(() => {
          this.loginSuccessfulAlert();
        });

        this.authService.getCurrentUser().subscribe(user => {
          this.authService.currentUser$.next(user);
          console.log("Subject User: ", user);
        });
      },
      (error) => {
        console.log('Error: ', error);
        this.loginFailedAlert();
        this.router.navigateByUrl('/sign-in');
      }
    );
  }
  async loginFailedAlert() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Your email or password is incorrect!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async loginSuccessfulAlert() {
     const alert = await this.alertController.create({
       header: 'Login Successful',
       message: 'You have been signed in!',
       buttons: ['OK'],
     });
     await alert.present();
  }
}
