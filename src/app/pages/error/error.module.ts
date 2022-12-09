import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorPageRoutingModule } from './error-routing.module';

import { ErrorPage } from './error.page';
import { FooterModule } from "../../components/footer/footer.module";


@NgModule({
    declarations: [ErrorPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ErrorPageRoutingModule,
        IonicModule,
        FooterModule
    ]
})
export class ErrorPageModule {}
