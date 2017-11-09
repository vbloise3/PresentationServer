import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

let elements: Array<Element>;
const service = '/api/elements';

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable()
export class TableDataService {

  constructor(private http: HttpClient) { }

  get() {
    this.http.get<Element[]>(service).subscribe(data => {
      console.log(data);
      elements = data;
      console.log('get() - element #1 name: ' + elements[0].name);
      console.log('get() - element #1 symbol: ' + elements[0].symbol);
    });
    return elements;
  }

  get2(): any {
    return this.http.get<Element[]>(service);/*.map(
      (response) => {
        const data = response;
        if (data) {
          elements = data;
        }
        return elements;
      }
    );*/
  }

  add(element) {
    // elements.push(element);
    return this.get();
  }

  load(symbols) {
    if (symbols) {
      return this.http.get<Element[]>(service).subscribe(data => {
        elements = data;
        console.log('load() - element #1 name: ' + elements[0].name);
        console.log('load() - element #1 symbol: ' + elements[0].symbol);
      });
    }
  }
}

