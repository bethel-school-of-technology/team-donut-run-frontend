import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import SwiperCore from 'swiper';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from 'src/app/components/footer/navbar.module copy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    SwiperModule,
    NavbarModule,
    FooterModule
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
