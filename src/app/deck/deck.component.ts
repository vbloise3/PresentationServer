import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeckComponent implements OnInit {
  presentationName: String;
  interval: any;
  isDarkTheme = false;

  constructor() {
    this.presentationName = 'First Attempt at Content Projection!';
  }

  ngOnInit(): void {
    this.generateData();

    this.interval = setInterval(() => {
      this.generateData();
    }, 15000);
  }

  generateData(): void {
    // in here make service call to get data from mongodbb
  }
}
