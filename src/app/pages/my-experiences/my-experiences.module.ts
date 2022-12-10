import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyExperiencesPageRoutingModule } from './my-experiences-routing.module';

import { MyExperiencesPage } from './my-experiences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyExperiencesPageRoutingModule
  ],
  declarations: [MyExperiencesPage]
})
export class MyExperiencesPageModule {}
