import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }


  get() {
    this.http.get<NpsClient[]>(service).subscribe(data => {
      console.log(data);
      npsClients = data;
      console.log('get() - npsClients #1 name: ' + npsClients[0].name);
      console.log('get() - npsClients #1 department: ' + npsClients[0].department);
    });
    return npsClients;
  }

  get2(): any {
    return this.http.get<NpsClient[]>(service);
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

  add(npsClient) {
    // npsclients.push(npsClient);
    return this.get();
  }

  load(symbols) {
    if (symbols) {
      return this.http.get<NpsClient[]>(service).subscribe(data => {
        npsClients = data;
        console.log('get() - npsClients #1 name: ' + npsClients[0].name);
        console.log('get() - npsClients #1 department: ' + npsClients[0].department);
      });
    }
  }
}
