import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ErrorPage } from './error.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule] ,
  exports: [RouterModule],
})
export class ErrorPageRoutingModule {}
