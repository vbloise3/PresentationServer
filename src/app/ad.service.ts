import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { AdItem } from './ad-item';

@Injectable()
export class AdService {
  // pass parameter to components to state directory and which slide within directory to use for html template
  getAds(presentationName, numberOfSlides) {
    return [
      new AdItem(HeroProfileComponent, presentationName, (numberOfSlides - 4).toString(), {name: 'Bombasto', bio: 'Brave as they come'}),

      new AdItem(HeroProfileComponent, presentationName, (numberOfSlides - 3).toString(), {name: 'Dr IQ', bio: 'Smart as they come'}),

      new AdItem(HeroJobAdComponent, presentationName, (numberOfSlides - 2).toString(), {headline: 'Hiring for several positions',
        body: 'Submit your resume today!'}),

      new AdItem(HeroJobAdComponent, presentationName, (numberOfSlides - 1).toString(), {headline: 'Openings in all departments',
        body: 'Apply today'}),

      new AdItem(HeroJobAdComponent, presentationName, (numberOfSlides - 0).toString(), {headline: 'I did it!!',
        body: 'Deck and slides next!!'}),
    ];
  }
}

