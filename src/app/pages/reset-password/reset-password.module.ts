import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarModule,
    FooterModule,
    ResetPasswordPageRoutingModule
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
