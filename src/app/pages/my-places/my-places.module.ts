import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPlacesPageRoutingModule } from './my-places-routing.module';

import { MyPlacesPage } from './my-places.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from 'src/app/components/footer/navbar.module copy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPlacesPageRoutingModule,
    NavbarModule,
    FooterModule
  ],
  declarations: [MyPlacesPage],
})
export class MyPlacesPageModule {}
