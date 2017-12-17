import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort} from '@angular/material';
import { NpsClientsService } from '../services/nps-clients.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { NpsClientsDataService, NpsClient } from '../services/nps-clients-data.service';
import {TableDataService} from '../services/table-data.service';

@Component({
  selector: 'app-nps-client',
  templateUrl: './nps-client.component.html',
  styleUrls: ['./nps-client.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NpsClientComponent implements OnInit {
  // instantiate npsclients to an empty array
  // npsclinets: Array<NpsClient>;
  // stuff: Observable<any>;
  displayedColumns = ['name', 'department', 'schedule', 'relationshipManager'];
  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource3: any; // = new MatTableDataSource(data);

  @ViewChild(MatSort) sort: MatSort;

  update(el: NpsClient, name: string) {
    // alert(name);
    if (name == null) { return; }
    // copy and mutate
    const copy = this.dataSource3.data2().slice();
    // alert(copy[0].name);
    el.name = name;
    this.dataSource3.update(copy);
  }

  applyFilter(filterValue: string) {
    // alert(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource3.filter = filterValue;
  }

  /* set the sort after the view init since this component will be able to query its view for the initialized sort */

  ngAfterInit() {
    this.dataSource3.sort = this.sort;
  }

  constructor(private npsclientsService: NpsClientsService, public tableDataservice: NpsClientsDataService) {
    this.tableDataservice.get2().subscribe(dataRecieved => {
      data = dataRecieved;
      // this.stuff = Observable.of(data);
      // this.dataSource = new ExampleDataSource(tableDataservice, this.stuff);
      // this.dataSource3 = new MatDataTableSource(data);
      // this.dataSource3 = new MatTableDataSource(data);
      this.dataSource3 = new ExampleDataSource(this.tableDataservice, data);
      this.dataSource3.sort = this.sort;
    });
  }

  ngOnInit() {
    // Retrieve npsclients from the API
    /*this.npsclientsService.getAllNpsClients().subscribe(npsclients => {
      this.npsclinets = npsclients as Array<NpsClient>;
    });*/
  }
}

let data: NpsClient[];

export class ExampleDataSource extends MatTableDataSource<any> {
  private dataSubject = new BehaviorSubject<NpsClient[]>([]);

  data2() {
    return this.dataSubject.value;
  }

  update(data2) {
    this.dataSubject.next(data2);
    // alert('trying to call TableDataService ' + this.dataSubject.getValue()[0].name);
    this.tableDataservice.save(this.dataSubject.getValue()[0]);
  }

  constructor(public tableDataservice: NpsClientsDataService, data2: any[]) {
    super(data2);
    this.dataSubject.next(data2);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  /*connect(): Observable<NpsClient[]> {
    return this.dataSubject;
  }*/

  disconnect() {}
}

const NPSCLIENT_DATA: NpsClient[] = [
  {name: 'dfgdfg', department: 'ghjrdgj', schedule: 'sdfgdsg', relationshipManager: 'sdfsd'},
  {name: 'lghl', department: 'tyurtyu', schedule: 'ewrrwe', relationshipManager: 'jvbnvb'},
];

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
];
