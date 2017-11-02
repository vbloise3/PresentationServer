import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';
import { AdDirective } from '../ad.directive';
import { AdItem } from '../ad-item';
import { AdComponent} from '../ad/ad.component';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  presentationName: String;
  isDarkTheme = false;

  wordData: Array<AgWordCloudData> = [
    {size: 500, text: 'vitae'},
    {size: 301, text: 'amet'},
    {size: 123, text: 'sit'},
    {size: 321, text: 'eget'},
    {size: 231, text: 'quis'},
    {size: 123, text: 'sem'},
    {size: 346, text: 'massa'},
    {size: 107, text: 'nec'},
    {size: 436, text: 'sed'},
    {size: 731, text: 'semper'},
    {size: 80, text: 'scelerisque'},
    {size: 96, text: 'egestas'},
    {size: 531, text: 'libero'},
    {size: 109, text: 'nisl'},
    {size: 972, text: 'odio'},
    {size: 213, text: 'tincidunt'},
    {size: 294, text: 'vulputate'},
    {size: 472, text: 'venenatis'},
    {size: 297, text: 'malesuada'},
    {size: 456, text: 'finibus'},
    {size: 123, text: 'tempor'},
    {size: 376, text: 'tortor'},
    {size: 93, text: 'congue'},
    {size: 123, text: 'possit'},
  ];

  options = {
    settings: {
      minFontSize: 10,
      maxFontSize: 100,
    },
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    labels: true // false to hide hover labels
  };

  constructor() {
    this.presentationName = 'First Attempt at Content Projection!';
  }

  ngOnInit(): void {
    this.generateData();
    /*this.interval = setInterval(() => {
      this.generateData();
    }, 15000); */
  }

  generateData(): void {
    // in here make service call to get data from mongodbb
  }
}
