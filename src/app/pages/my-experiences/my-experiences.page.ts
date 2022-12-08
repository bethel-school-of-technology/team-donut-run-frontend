import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-my-experiences',
  templateUrl: './my-experiences.page.html',
  styleUrls: ['./my-experiences.page.scss'],
})
export class MyExperiencesPage implements OnInit {

  useAPI: boolean = true;

  myExperiencesArray: Experience[] = [];

  



  constructor(private expService: ExperienceService, public navCtrl: NavController) { }

  ngOnInit() {
    // get current user
    // get current user's experiences
  }

  CreateExperiencePage() {
    this.navCtrl.navigateForward('create-experience');
  }
  

}
