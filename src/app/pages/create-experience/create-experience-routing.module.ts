import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExperiencePage } from './create-experience.page';

const routes: Routes = [
  {
    path: '',
    component: CreateExperiencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateExperiencePageRoutingModule {}
