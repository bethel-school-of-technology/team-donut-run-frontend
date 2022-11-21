import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

import { FooterModule } from 'src/app/components/footer/navbar.module copy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NavbarModule,
    FooterModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
