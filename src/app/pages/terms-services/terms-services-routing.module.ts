import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsServicesPage } from './terms-services.page';

const routes: Routes = [
  {
    path: '',
    component: TermsServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsServicesPageRoutingModule {}
