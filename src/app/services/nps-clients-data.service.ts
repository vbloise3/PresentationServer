import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

let npsClients: Array<NpsClient>;
const service = '/api/npsClients';

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
    alert('about to save ' + npsclient.name);
    this.http.put('/api/npsclients', npsclient);
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
