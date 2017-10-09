import { Component, OnInit } from '@angular/core';
import { ElementsService } from '../services/elements.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  // instantiate posts to an empty array
  elements: any = [];
  displayedColumns = ['Position', 'Name', 'Weight', 'Symbol'];

  constructor(private elementsService: ElementsService) { }

  ngOnInit() {
    // Retrieve elements from the API
    this.elementsService.getAllElements().subscribe(elements => {
      this.elements = elements;
    });
  }

}
