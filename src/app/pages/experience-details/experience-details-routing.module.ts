import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExperienceDetailsPage } from './experience-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExperienceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceDetailsPageRoutingModule {}
