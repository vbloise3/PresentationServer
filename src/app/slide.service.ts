import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class SlideService {

  getSlideOld(): any {
    const data: any = '';
      this.http.get('/api/firstPresentation'); /*.map(
      (response) => {
        data = response;
        if (data) {
          console.log('got data: ' + data);
        } else {
          console.log('did\'nt get the data');
        }
      });
      return data; */
  }

  // Take parameters here to define which directory and which slide file within the directory
  getSlide(directory: string, slide: string): any {
    const theApi = '/api/getThePresentation';
    const params = new HttpParams()
      .set('slide', slide)
      .set('directory', directory);
    return this.http.get(theApi, {params: params, responseType: 'text'});
      // .map(res => res.text());
  }

  constructor(private http: HttpClient) { }

}
