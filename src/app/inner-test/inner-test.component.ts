import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inner-test',
  templateUrl: './inner-test.component.html',
  styleUrls: ['./inner-test.component.css']
})
export class InnerTestComponent implements OnInit {
  componentName: string;

  constructor() {
    this.componentName = 'My inner test compnent';
  }

  ngOnInit() {
  }

}
