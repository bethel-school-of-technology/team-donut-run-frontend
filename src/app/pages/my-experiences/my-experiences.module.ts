import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyExperiencesPageRoutingModule } from './my-experiences-routing.module';

import { MyExperiencesPage } from './my-experiences.page';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
    declarations: [MyExperiencesPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyExperiencesPageRoutingModule,
        FooterModule
    ]
})
export class MyExperiencesPageModule {}
