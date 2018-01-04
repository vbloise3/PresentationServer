import { Component, Input, Output, EventEmitter, Optional, Host, OnInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import 'rxjs/add/operator/filter';
import {NpsClient} from '../services/nps-clients-data.service';

@Component({
  selector: 'app-inline-insert',
  templateUrl: './inline-insert.component.html',
  styleUrls: ['./inline-insert.component.scss']
})
export class InlineInsertComponent implements OnInit {

  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.name = this._value = x;
  }
  private _value = '';
  @Input()
  get value2(): string { return this._value2; }
  set value2(x: string) {
    this.department = this._value2 = x;
  }
  private _value2 = '';
  @Input()
  get value3(): string { return this._value3; }
  set value3(x: string) {
    this.schedule = this._value3 = x;
  }
  private _value3 = '';
  @Input()
  get value4(): string { return this._value4; }
  set value4(x: string) {
    this.relationshipManager = this._value4 = x;
  }
  private _value4 = '';
  @Input()
  get title(): string { return this._title; }
  set title(x: string) {
    this.heading = this._title = x;
  }
  private _title = '';

  /** Form model for the input. */
  name = '';
  department = '';
  schedule = '';
  relationshipManager = '';
  heading = '';
  theNewNpsClient: NpsClient = {name: ' ', department: ' ', schedule: ' ', relationshipManager: ' '};
  returnValue = '';

  @Output() update = new EventEmitter<NpsClient>();

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed
        .filter(val => val == null)
        .subscribe(() => {
          this.name = this.value || '';
          this.department = this.value2 || '';
          this.schedule = this.value3 || '';
          this.relationshipManager = this.value4 || '';
          this.heading = this.title || '';
      });
    }
  }

  onSubmit() {
    if (this.popover) {
      this.theNewNpsClient.name = this.name;
      this.theNewNpsClient.department = this.department;
      this.theNewNpsClient.schedule = this.schedule;
      this.theNewNpsClient.relationshipManager = this.relationshipManager;
      this.popover.close(this.theNewNpsClient);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}
