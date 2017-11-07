import {Component, Input, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AdComponent} from '../ad/ad.component';
import {SlideService} from '../slide.service';

@Component({
  selector: 'app-hero-job-ad',
  templateUrl: './hero-job-ad.component.html',
  styleUrls: ['./hero-job-ad.component.css']
})
export class HeroJobAdComponent implements AdComponent, OnInit {

  @Input() data: any;
  @Input() directory: string;
  @Input() slide: string;
  private myTemplate: any = '';

  // receive parameters
  constructor(public slideService: SlideService) {
  }

  ngOnInit() {
    // pass parameters on getSlide function to give directory and slide file within directory
    this.slideService.getSlide().subscribe(template => {
      this.myTemplate = template;
    });
  }

}
