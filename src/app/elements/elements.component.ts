import { Component, OnInit } from '@angular/core';
import { ElementsService } from '../services/elements.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TableDataService, Element} from '../services/table-data.service';
import { AgWordCloudModule, AgWordCloudData} from 'angular4-word-cloud';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component2.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  // instantiate posts to an empty array
  elements: Array<Element>;
  stuff: Observable<any>;
  // elements: any = [];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource: ExampleDataSource;

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

  constructor(private elementsService: ElementsService, public tableDataservice: TableDataService) {
    this.tableDataservice.get2().subscribe(dataReceived => {
      data = dataReceived;
      console.log(data.length + ' data elements from DataSource loaded at ' + new Date());
      this.stuff = Observable.of(data);
      this.dataSource = new ExampleDataSource(tableDataservice, this.stuff);
    });
  }

  ngOnInit() {
    // Retrieve elements from the API
    this.elementsService.getAllElements().subscribe(elements => {
      this.elements = elements;
    });
  }
}

let data: Element[];

export class ExampleDataSource extends DataSource<any> {
  service: TableDataService;
  elements: Array<Element>;
  stuff: Observable<Element[]>;

  constructor(service: TableDataService, theData: Observable<Element[]>) {
    super();
    this.service = service;
    this.stuff = theData;
  }

  public loadTheElements() {
    this.service.get2().subscribe(dataReceived => {
      data = dataReceived;
      console.log(data.length + ' data elements loaded at ' + new Date());
    });
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return this.stuff;
  }

  disconnect() {}
}

