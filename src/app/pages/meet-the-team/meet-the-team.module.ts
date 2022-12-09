import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetTheTeamPageRoutingModule } from './meet-the-team-routing.module';

import { MeetTheTeamPage } from './meet-the-team.page';
import { FooterModule } from "../../components/footer/footer.module";

@NgModule({
    declarations: [MeetTheTeamPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MeetTheTeamPageRoutingModule,
        FooterModule
    ]
})
export class MeetTheTeamPageModule {}
