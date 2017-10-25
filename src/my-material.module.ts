import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,
  MatInputModule, MatSelectModule, MatOptionModule,
  MatCardModule, MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule ({
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,
    MatInputModule, MatSelectModule, MatOptionModule, MatCardModule,
    MatTableModule, BrowserAnimationsModule
  ]
})
export class MyMaterialModule {}
