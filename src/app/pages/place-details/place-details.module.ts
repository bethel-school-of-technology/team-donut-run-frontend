import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailsPageRoutingModule } from './place-details-routing.module';
import { NavbarModule } from 'src/app/components/navbar.module';
import { PlaceDetailsPage } from './place-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule,
    NavbarModule,
  ],
  declarations: [PlaceDetailsPage],
})
export class PlaceDetailsPageModule {}
