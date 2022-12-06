import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetTheTeamPage } from './meet-the-team.page';

const routes: Routes = [
  {
    path: '',
    component: MeetTheTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetTheTeamPageRoutingModule {}
