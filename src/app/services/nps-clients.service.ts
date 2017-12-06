import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class NpsClientsService {

  constructor(private http: HttpClient) { }

  getAllNpsClients() {
    return this.http.get('/api/npsClients');
  }
}
