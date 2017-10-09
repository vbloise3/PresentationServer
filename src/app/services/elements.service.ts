import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ElementsService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getAllElements() {
    return this.http.get('/api/elements')
      .map(res => res.json());
  }

}
