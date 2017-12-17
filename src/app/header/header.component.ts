import { Component, Input } from '@angular/core';
import { VERSION } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  version = VERSION.full;
}
