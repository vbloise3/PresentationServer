import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdComponent } from '../ad/ad.component';
import { AdDirective } from '../ad.directive';
import { HeroJobAdComponent } from '../hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from '../hero-profile/hero-profile.component';
import { AdService } from '../ad.service';
import { HomeComponent } from '../home/home.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent, AdComponent, AdDirective, HeroJobAdComponent, HeroProfileComponent],
  entryComponents: [HeroJobAdComponent, HeroProfileComponent],
  exports: [HomeComponent],
  providers: [AdService]
})
export class PresentationModule { }
