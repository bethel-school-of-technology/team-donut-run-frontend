import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailsPageRoutingModule } from './place-details-routing.module';

import { PlaceDetailsPage } from './place-details.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SwiperModule } from 'swiper/angular';
import { FooterModule } from 'src/app/components/footer/footer.module';
import SwiperCore, { EffectCards, Navigation, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule,
    NavbarModule,
    FooterModule,
    SwiperModule,
  ],
  declarations: [PlaceDetailsPage]
})
export class PlaceDetailsPageModule {}
