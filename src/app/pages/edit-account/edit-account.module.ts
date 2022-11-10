import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAccountPageRoutingModule } from './edit-account-routing.module';

import { EditAccountPage } from './edit-account.page';
import { NavbarModule } from 'src/app/components/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAccountPageRoutingModule,
    NavbarModule
  ],
  declarations: [EditAccountPage],
})
export class EditAccountPageModule {}
