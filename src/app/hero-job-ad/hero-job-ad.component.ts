import {Component, Input, OnInit} from '@angular/core';

import { AdComponent} from '../ad/ad.component';

@Component({
  selector: 'app-hero-job-ad',
  templateUrl: './hero-job-ad.component.html',
  styleUrls: ['./hero-job-ad.component.css']
})
export class HeroJobAdComponent implements AdComponent, OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
