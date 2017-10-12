import { Component, OnInit } from '@angular/core';
import { ElementsService } from '../services/elements.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TableDataService, Element} from '../services/table-data.service';

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

