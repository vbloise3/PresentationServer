import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface AdComponent {
  data: any;
  directory: string;
  slide: string;
}
