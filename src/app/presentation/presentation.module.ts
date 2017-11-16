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

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  declarations: [HomeComponent, AdComponent, AdDirective, HeroJobAdComponent, HeroProfileComponent, InnerTestComponent, ElementsComponent,
    DeckComponent,
    SlideComponent],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent],
  exports: [HomeComponent],
  providers: [AdService, SlideService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PresentationModule { }
