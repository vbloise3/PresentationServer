import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  npsclinets: Array<NpsClient>;
  stuff: Observable<any>;
  displayedColumns = ['name', 'department', 'schedule', 'relationshipManager'];
  dataSource: ExampleDataSource;

  constructor(private npsclientsService: NpsClientsService, public tableDataservice: NpsClientsDataService) {
    this.tableDataservice.get2().subscribe(dataRecieved => {
      data = dataRecieved;
      this.stuff = Observable.of(data);
      this.dataSource = new ExampleDataSource(tableDataservice, this.stuff);
    });
  }

  ngOnInit() {
    // Retrieve npsclients from the API
    this.npsclientsService.getAllNpsClients().subscribe(npsclients => {
      this.npsclinets = npsclients as Array<NpsClient>;
    });
  }
}

let data: NpsClient[];

export class ExampleDataSource extends DataSource<any> {
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
}
