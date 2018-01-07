import { Component, Optional, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, NgZone, ApplicationRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog, MatDialogRef} from '@angular/material';
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
  displayedColumns = ['name', 'department', 'schedule', 'relationshipManager', 'actions'];
  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource3: any; // = new MatTableDataSource(data);
  lastDialogResult: string;

  @ViewChild(MatSort) sort: MatSort;

  update(el: NpsClient, position: string, name: any) {
    // alert('update: ' + el.name);
    if (name == null) { return; }
    let npsclient: NpsClient;
    npsclient = {name: ' ', department: ' ', schedule: ' ', relationshipManager: ' ', _id: ' '};
    // copy and mutate
    const copy = this.dataSource3.data2().slice();
    // alert(copy[0].name);
    if ( position === 'all') {
      npsclient.name = el.name;
      npsclient.department = el.department;
      npsclient.schedule = el.schedule;
      npsclient.relationshipManager = el.relationshipManager;
      npsclient._id = el._id;
    } else if (position === 'update' ) {
      el.name = name.name;
      el.department = name.department;
      el.schedule = name.schedule;
      el.relationshipManager = name.relationshipManager;
      el._id = name._id;
    } else if ( position === 'name') {
      el.name = name;
    } else if ( position === 'department') {
      el.department = name;
    } else if ( position === 'schedule') {
      el.schedule = name;
    } else if ( position === 'relationshipManager') {
      el.relationshipManager = name;
    }
    if ( position === 'all' ) {
      this.dataSource3.update(npsclient, copy);
    } else {
      this.dataSource3.update(el, copy);
    }
  }

  delete(el: NpsClient, position: string, theNewNpsClient: NpsClient) {
    const copy = this.dataSource3.data2().slice();
    if (theNewNpsClient == null) { return; }
    this.dataSource3.delete(el, copy);
    // retrieve the newly updated table data
    this.tableDataservice.get2().subscribe(dataRecieved => {
      this.zone.run(() => {
        data = dataRecieved;
        this.dataSource3 = new ExampleDataSource(this.tableDataservice, data);
        this.dataSource3.sort = this.sort;
      });
    });
    // end retrieve newly updated table data
  }

  insert(el: NpsClient, position: string, theNewNpsClient: NpsClient) {
    // alert(theNewNpsClient._id);
    let npsclient: NpsClient;
    npsclient = {name: ' ', department: ' ', schedule: ' ', relationshipManager: ' ', _id: ' '};
    if (theNewNpsClient == null) { return; }
    // copy and mutate
    const copy = this.dataSource3.data2().slice();
    const copy2 = Object.assign({}, theNewNpsClient);
    // alert(copy[0].name);
    if ( position === 'all' ) {
      npsclient.name = theNewNpsClient.name;
      npsclient.department = theNewNpsClient.department;
      npsclient.schedule = theNewNpsClient.schedule;
      npsclient.relationshipManager = theNewNpsClient.relationshipManager;
      npsclient._id = theNewNpsClient._id;
    } else if ( position === 'update' ) {
      npsclient.name = theNewNpsClient.name;
      el.name = copy2.name;
      npsclient.department = theNewNpsClient.department;
      el.department = copy2.department;
      npsclient.schedule = theNewNpsClient.schedule;
      el.schedule = copy2.schedule;
      npsclient.relationshipManager = theNewNpsClient.relationshipManager;
      el.relationshipManager = copy2.relationshipManager;
      npsclient._id = el._id;
    } else if ( position === 'name') {
      npsclient.name = theNewNpsClient.name;
    } else if ( position === 'department') {
      npsclient.department = theNewNpsClient.department;
    } else if ( position === 'schedule') {
      npsclient.schedule = theNewNpsClient.schedule;
    } else if ( position === 'relationshipManager') {
      npsclient.relationshipManager = theNewNpsClient.relationshipManager;
    }
    if ( position === 'update') {
      this.dataSource3.update(npsclient, copy);
    } else {
      this.dataSource3.insert(npsclient, copy);
    }
    // retrieve the newly updated table data
    if ( position !== 'update') {
      this.tableDataservice.get2().subscribe(dataRecieved => {
        this.zone.run(() => {
          data = dataRecieved;
          this.dataSource3 = new ExampleDataSource(this.tableDataservice, data);
          this.dataSource3.sort = this.sort;
        });
      });
      this.changeDetect.tick();
    }
    // end retrieve newly updated table data
  }

  applyFilter(filterValue: string) {
    // alert(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource3.filter = filterValue;
  }

  refresh() {
    this.tableDataservice.get2().subscribe(dataReceived => {
      this.zone.run(() => {
        data = dataReceived;
        this.dataSource3 = new ExampleDataSource(this.tableDataservice, data);
        this.dataSource3.sort = this.sort;
      });
    });
    this.changeDetect.tick();
  }

  /* set the sort after the view init since this component will be able to query its view for the initialized sort */

  ngAfterInit() {
    this.dataSource3.sort = this.sort;
  }

  constructor(private changeDetect: ApplicationRef, private zone: NgZone, private npsclientsService: NpsClientsService, public tableDataservice: NpsClientsDataService) {
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

  update(theNpsclient, data2) {
    this.dataSubject.next(data2);
    // alert('trying to call TableDataService ' + theNpsclient._id);
    // this.tableDataservice.save(this.dataSubject.getValue()[0]);
    this.tableDataservice.save(theNpsclient);
  }

  insert(theNpsclient, data2) {
    this.dataSubject.next(data2);
    this.tableDataservice.insert(theNpsclient);
  }

  delete(theNpsclient, data2) {
  this.dataSubject.next(data2);
  this.tableDataservice.delete(theNpsclient);
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
  {name: 'dfgdfg', department: 'ghjrdgj', schedule: 'sdfgdsg', relationshipManager: 'sdfsd', _id: 'dsf'},
  {name: 'lghl', department: 'tyurtyu', schedule: 'ewrrwe', relationshipManager: 'jvbnvb', _id: 'cv'},
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

