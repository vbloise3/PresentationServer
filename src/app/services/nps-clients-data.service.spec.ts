import { TestBed, inject } from '@angular/core/testing';

import { NpsClientDataService } from './nps-clients-data.service';

describe('NpsClientDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NpsClientDataService]
    });
  });

  it('should be created', inject([NpsClientDataService], (service: NpsClientDataService) => {
    expect(service).toBeTruthy();
  }));
});
