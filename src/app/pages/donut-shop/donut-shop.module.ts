import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonutShopPageRoutingModule } from './donut-shop-routing.module';

import { DonutShopPage } from './donut-shop.page';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
    declarations: [DonutShopPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DonutShopPageRoutingModule,
        FooterModule
    ]
})
export class DonutShopPageModule {}
