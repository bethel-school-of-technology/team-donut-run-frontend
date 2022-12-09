import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountPageRoutingModule } from './edit-account-routing.module';

import { EditAccountPage } from './edit-account.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from "../../components/footer/footer.module";


@NgModule({
    declarations: [EditAccountPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditAccountPageRoutingModule,
        NavbarModule,
        IonicModule,
        FooterModule
    ]
})
export class EditAccountPageModule {}
