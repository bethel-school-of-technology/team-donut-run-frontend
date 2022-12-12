import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExperiencePageRoutingModule } from './create-experience-routing.module';

import { CreateExperiencePage } from './create-experience.page';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
    declarations: [CreateExperiencePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateExperiencePageRoutingModule,
        FooterModule
    ]
})
export class CreateExperiencePageModule {}
