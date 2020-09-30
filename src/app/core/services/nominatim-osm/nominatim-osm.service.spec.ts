import { TestBed } from '@angular/core/testing';

import { NominatimOsmService } from './nominatim-osm.service';

describe('NominatimOsmService', () => {
  let service: NominatimOsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominatimOsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
