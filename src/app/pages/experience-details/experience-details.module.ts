import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperienceDetailsPageRoutingModule } from './experience-details-routing.module';

import { ExperienceDetailsPage } from './experience-details.page';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
    declarations: [ExperienceDetailsPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ExperienceDetailsPageRoutingModule,
        FooterModule
    ]
})
export class ExperienceDetailsPageModule {}
