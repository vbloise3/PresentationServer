import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AdComponent} from '../ad/ad.component';
import {SlideService} from '../slide.service';

@Component({
  selector: 'app-nps-schedule',
  templateUrl: './nps-schedule.component.html',
  styleUrls: ['./nps-schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NpsScheduleComponent implements AdComponent, OnInit {

  slideTitle: string;
  tableTitle: string;
  @Input() data: any;
  @Input() directory: string;
  @Input() slide: string;
  public myTemplate: any = '';

  constructor(public slideService: SlideService) {
    this.slideTitle = 'NPS Client Schedule \u2014 GIOS 2018';
    this.tableTitle = 'NPS Survey Candidates by Half';
  }

  ngOnInit() {
    // pass parameters on getSlide function to give directory and slide file within directory
    this.slideService.getSlide(this.directory, this.slide).subscribe(template => {
      this.myTemplate = template;
    });
  }

}
