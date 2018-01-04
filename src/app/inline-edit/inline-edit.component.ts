import { Component, Input, Optional, Host, OnInit } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-inline-edit',
  styleUrls: ['./inline-edit.component.scss'],
  templateUrl: './inline-edit.component.html'
      /*`
    <form (ngSubmit)="onSubmit()">
      <div class="mat-subheading-2">{{heading}}</div>

      <mat-form-field>
        <input matInput maxLength="140" name="name" [(ngModel)]="name" value="{{name}}">
        <mat-hint align="end">{{name?.length || 0}}/140</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">CANCEL</button>
        <button mat-button type="submit" color="primary">SAVE</button>
      </div>
    </form>
  `*/
})
export class InlineEditComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
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
    // alert('delete? ' + this.heading.slice(0, 6));
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
