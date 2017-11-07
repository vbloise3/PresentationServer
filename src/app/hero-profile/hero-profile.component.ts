import { Component, OnInit, Input } from '@angular/core';
import {AdComponent} from '../ad/ad.component';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit, AdComponent {

  @Input() data: any;
  @Input() directory: string;
  @Input() slide: string;

  constructor() { }

  ngOnInit() {
  }

}
