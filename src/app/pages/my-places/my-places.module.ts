import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlacesPageRoutingModule } from './my-places-routing.module';

import { MyPlacesPage } from './my-places.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlacesPageRoutingModule,
    NavbarModule
  ],
  declarations: [MyPlacesPage],
})
export class MyPlacesPageModule {}
