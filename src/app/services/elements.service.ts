import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class ElementsService {

  constructor(private http: HttpClient) { }

  // Get all posts from the API
  getAllElements() {
    return this.http.get('/api/elements');
      // .map(res => res.json());
  }

}
