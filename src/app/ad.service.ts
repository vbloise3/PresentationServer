import { Injectable } from '@angular/core';

import { HeroJobAdComponent } from './hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { AdItem } from './ad-item';

@Injectable()
export class AdService {
  // pass parameter to components to state directory and which slide within directory to use for html template
  getAds() {
    return [
      new AdItem(HeroProfileComponent, 'firstPresentation', '1', {name: 'Bombasto', bio: 'Brave as they come'}),

      new AdItem(HeroProfileComponent, 'firstPresentation', '2', {name: 'Dr IQ', bio: 'Smart as they come'}),

      new AdItem(HeroJobAdComponent, 'firstPresentation', '3', {headline: 'Hiring for several positions',
        body: 'Submit your resume today!'}),

      new AdItem(HeroJobAdComponent, 'firstPresentation', '4', {headline: 'Openings in all departments',
        body: 'Apply today'}),

      new AdItem(HeroJobAdComponent, 'firstPresentation', '5', {headline: 'I did it!!',
        body: 'Deck and slides next!!'}),
    ];
  }
}

