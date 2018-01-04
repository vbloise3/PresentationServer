import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class NpsClientsService {

  constructor(private http: HttpClient) { }

  getAllNpsClients() {
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    return this.http.get('/api/npsClients');
  }
}
