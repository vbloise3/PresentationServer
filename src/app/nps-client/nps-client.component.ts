import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort} from '@angular/material';
import { NpsClientsService } from '../services/nps-clients.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NpsClientsDataService, NpsClient } from '../services/nps-clients-data.service';

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

  /* set the sort after the view init since this component will be able to query its view for the initialized sort */

  ngAfterInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(private npsclientsService: NpsClientsService, public tableDataservice: NpsClientsDataService) {
    this.tableDataservice.get2().subscribe(dataRecieved => {
      data = dataRecieved;
      // this.stuff = Observable.of(data);
      // this.dataSource = new ExampleDataSource(tableDataservice, this.stuff);
      // this.dataSource3 = new MatDataTableSource(data);
      this.dataSource3 = new MatTableDataSource(data);
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

/*export class ExampleDataSource extends DataSource<any> {
  service: NpsClientsDataService;
  elements: Array<NpsClient>;
  stuff: Observable<NpsClient[]>;

  constructor (service: NpsClientsDataService, theData: Observable<NpsClient[]>) {
    super();
    this.service = service;
    this.stuff = theData;
  }

  public loadTheNpsClients() {
    this.service.get2().subscribe(dataReceived => {
      data = dataReceived;
    });
  }

  // Connect function called by the table to retrieve one stream containing the data to render
  connect(): Observable<NpsClient[]> {
    return this.stuff;
  }

  disconnect() {}
}*/

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
