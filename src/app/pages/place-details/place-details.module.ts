import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailsPageRoutingModule } from './place-details-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { PlaceDetailsPage } from './place-details.page';
import { FooterModule } from "../../components/footer/navbar.module copy";
import { SwiperModule } from 'swiper/angular';

import SwiperCore, { EffectCards, Navigation, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@NgModule({
    declarations: [PlaceDetailsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlaceDetailsPageRoutingModule,
        NavbarModule,
        FooterModule,
        SwiperModule
    ]
})
export class PlaceDetailsPageModule {}
