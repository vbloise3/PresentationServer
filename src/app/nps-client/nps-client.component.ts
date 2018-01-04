import { Component, Optional, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
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
  displayedColumns = ['name', 'department', 'schedule', 'relationshipManager'];
  // displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource3: any; // = new MatTableDataSource(data);
  lastDialogResult: string;

  @ViewChild(MatSort) sort: MatSort;

  update(el: NpsClient, position: string, name: string) {
    // alert(name);
    if (name == null) { return; }
    // copy and mutate
    const copy = this.dataSource3.data2().slice();
    // alert(copy[0].name);
    if ( position === 'name') {
      el.name = name;
    } else if ( position === 'department') {
      el.department = name;
    } else if ( position === 'schedule') {
      el.schedule = name;
    } else if ( position === 'relationshipManager') {
      el.relationshipManager = name;
    }
    this.dataSource3.update(el, copy);
  }

  insert(el: NpsClient, position: string, name: string) {
    // alert(name);
    if (name == null) { return; }
    // copy and mutate
    const copy = this.dataSource3.data2().slice();
    // alert(copy[0].name);
    if ( position === 'name') {
      el.name = name;
    } else if ( position === 'department') {
      el.department = name;
    } else if ( position === 'schedule') {
      el.schedule = name;
    } else if ( position === 'relationshipManager') {
      el.relationshipManager = name;
    }
    this.dataSource3.insert(el, copy);
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

  constructor(private _dialog: MatDialog, private npsclientsService: NpsClientsService, public tableDataservice: NpsClientsDataService) {
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

  openDialog() {
    const dialogRef = this._dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    });
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
    // alert('trying to call TableDataService ' + theNpsclient.name);
    // this.tableDataservice.save(this.dataSubject.getValue()[0]);
    this.tableDataservice.save(theNpsclient);
  }

  insert(theNpsclient, data2) {
    this.dataSubject.next(data2);
    this.tableDataservice.insert(theNpsclient);
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

@Component({
  template: `
    <!--div id="container" class="centerIt"-->
        <mat-toolbar color="primary" style="height: 3.15em; width: 111%; margin-left: -1em; margin-top: -1em;">
            <img class="mdCardSmallDialogImg" src="app/app.component/MarinBioPic2.png">
            <span id="center" class="textBottom largeFont" style="width: 50%; margin-left: -1em;">&nbsp;My Contact Info</span>
        </mat-toolbar>
    <!--/div-->
    <table>
        <tr>
          <td><a href="mailto:meb339@scarletmail.rutgers.edu?Subject=Resume" style="color: blue;"><i class="material-icons md-18 iconBottom">email</i>meb339@scarletmail.rutgers.edu</a></td>
          <td><a href="tel:610-308-1130" style="color: blue"><i class="material-icons md-18 iconBottom">phone_iphone</i>610-308-1130</a></td>
        </tr>
    </table>
    <div class="centerIt2">
        <button mat-raised-button (click)="dialogRef.close('done')">Done</button>
    </div>
  `,
})
export class DialogContent {
  constructor(@Optional() public dialogRef: MatDialogRef<DialogContent>) { }
}
