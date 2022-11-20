import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterModule } from 'src/app/components/footer/navbar.module copy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    NavbarModule,
    FooterModule
  ],
  declarations: [SignUpPage],
})
export class SignUpPageModule {}
