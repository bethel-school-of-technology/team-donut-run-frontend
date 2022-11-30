import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonutShopPage } from './donut-shop.page';

const routes: Routes = [
  {
    path: '',
    component: DonutShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonutShopPageRoutingModule {}
