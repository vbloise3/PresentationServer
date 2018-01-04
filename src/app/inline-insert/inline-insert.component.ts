import { Component, Input, Optional, Host, OnInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import 'rxjs/add/operator/filter';

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
  get title(): string { return this._title; }
  set title(x: string) {
    this.heading = this._title = x;
  }
  private _title = '';

  /** Form model for the input. */
  name = '';
  heading = '';
  returnValue = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed
        .filter(val => val == null)
        .subscribe(() => { this.name = this.value || ''; this.heading = this.title || ''; } );
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.name);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}
