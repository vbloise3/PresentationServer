import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdComponent } from '../ad/ad.component';
import { AdDirective } from '../ad.directive';
import { HeroJobAdComponent } from '../hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import { AdService } from '../ad.service';
import { HomeComponent } from '../home/home.component';
import { InnerTestComponent } from '../inner-test/inner-test.component';
import { SlideService } from '../slide.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { ElementsComponent } from '../elements/elements.component';
import { DeckComponent } from '../deck/deck.component';
import { SlideComponent } from '../slide/slide.component';
import { MyMaterialModule} from '../../my-material.module';
import { NpsClientsService } from '../services/nps-clients.service';
import { NpsClientsDataService } from '../services/nps-clients-data.service';
import { NpsClientComponent } from '../nps-client/nps-client.component';

import { AgWordCloudModule} from 'angular4-word-cloud';
import { NpsScheduleComponent } from '../nps-schedule/nps-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    AgWordCloudModule.forRoot()
  ],
  declarations: [HomeComponent, AdComponent, AdDirective, HeroJobAdComponent, HeroProfileComponent, InnerTestComponent, ElementsComponent,
    NpsClientComponent,
    DeckComponent,
    SlideComponent,
    NpsScheduleComponent],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent, NpsScheduleComponent],
  exports: [HomeComponent],
  providers: [AdService, SlideService, NpsClientsService, NpsClientsDataService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PresentationModule { }
