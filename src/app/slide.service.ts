import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SlideService {

  getSlideOld(): any {
    let data: any = '';
      this.http.get('/api/firstPresentation').map(
      (response) => {
        data = response;
        if (data) {
          console.log('got data: ' + data);
        } else {
          console.log('did\'nt get the data');
        }
      });
      return data;
  }

  // Take parameters here to define which directory and which slide file within the directory
  getSlide(): any {
    return this.http.get('/api/firstPresentation')
      .map(res => res.text());
  }

  constructor(private http: Http) { }

}
