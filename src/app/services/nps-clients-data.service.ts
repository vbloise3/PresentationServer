import { Injectable, NgZone, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

let npsClients: Array<NpsClient>;
const service = '/api/npsclients';

export interface NpsClient {
  name?: string;
  department: string;
  schedule: string;
  relationshipManager: string;
}

@Injectable()
export class NpsClientsDataService {

  constructor(private changeDetect: ApplicationRef, private zone: NgZone, private http: HttpClient) { }


  get() {
    this.http.get<NpsClient[]>(service).subscribe(data => {
      this.zone.run(() => {
        console.log(data);
        npsClients = data;
        console.log('get() - npsClients #1 name: ' + npsClients[0].name);
        console.log('get() - npsClients #1 department: ' + npsClients[0].department);
      });
    });
    return npsClients;
  }

  get2(): any {
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '0');
    headers = headers.append('Pragma', 'no-cache');
    return this.http.get<NpsClient[]>(service, {headers: headers});
  }

  save(npsclient) {
    // alert('about to save ' + npsclient._id);
    const url = service + '/' + npsclient._id;
    const body = JSON.stringify(npsclient);
    this.http.put(url, {
      'name': npsclient.name,
      'department': npsclient.department,
      'schedule': npsclient.schedule,
      'relationshipManager': npsclient.relationshipManager
    }).subscribe(
      dataOut => {
        console.log('PUT Request is successful ', dataOut);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  insert(npsclient) {
    // alert('about to insert ' + npsclient._id);
    const url = service; // + '/' + npsclient._id;
    const body = JSON.stringify(npsclient);
    let headers = new HttpHeaders();
    headers = headers.set('If-Modified-Since', '0');
    headers = headers.append('Cache-control', 'no-cache');
    headers = headers.append('Cache-control', 'no-store');
    headers = headers.append('Expires', '-1');
    headers = headers.append('Pragma', 'no-cache');
    this.http.post(url, {
      'name': npsclient.name,
      'department': npsclient.department,
      'schedule': npsclient.schedule,
      'relationshipManager': npsclient.relationshipManager
    }).subscribe(
      dataOut => {
        console.log('POST Request is successful ', dataOut);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  delete(npsclient) {
    const url = service + '/' + npsclient._id;
    this.http.delete(url).subscribe(
      dataOut => {
        console.log('DELETE Request is successful ', dataOut);
      },
      error => {
        console.log('Error', error);
      }
    );
  }

  add(npsClient) {
    // npsclients.push(npsClient);
    return this.get();
  }

  load(symbols) {
    if (symbols) {
      return this.http.get<NpsClient[]>(service).subscribe(data => {
        this.zone.run(() => {
          npsClients = data;
          console.log('get() - npsClients #1 name: ' + npsClients[0].name);
          console.log('get() - npsClients #1 department: ' + npsClients[0].department);
        });
      });
    }
  }
}
