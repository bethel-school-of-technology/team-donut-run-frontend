import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public navCtrl: NavController) {}
  animatePlay = false;
  ngOnInit() {}

  TermsPage() {
    console.log();
    this.navCtrl.navigateForward('terms-services');
  }

 async DonutPage() {
    this.DonutRun();
    await this.delay(2000);
    this.animatePlay = false

    this.navCtrl.navigateForward('donut-shop');
  }

  DonutRun(){
    this.animatePlay = true
  }

  
  delay = ms => new Promise(res => setTimeout(res, ms));

}