import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TermsServicesPageRoutingModule } from './terms-services-routing.module';
import { TermsServicesPage } from './terms-services.page';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
    declarations: [TermsServicesPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TermsServicesPageRoutingModule,
        IonicModule,
        FooterModule
    ]
})
export class TermsServicesPageModule {}
