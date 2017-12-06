import { TestBed, inject } from '@angular/core/testing';

import { NpsClientsService } from './nps-clients.service';

describe('NpsClientsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NpsClientsService]
    });
  });

  it('should be created', inject([NpsClientsService], (service: NpsClientsService) => {
    expect(service).toBeTruthy();
  }));
});
