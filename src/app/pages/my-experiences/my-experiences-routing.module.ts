import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyExperiencesPage } from './my-experiences.page';

const routes: Routes = [
  {
    path: '',
    component: MyExperiencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyExperiencesPageRoutingModule {}
