import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {}
  
  TermsPage(){
    console.log()
    this.navCtrl.navigateForward('terms-services');
  }}