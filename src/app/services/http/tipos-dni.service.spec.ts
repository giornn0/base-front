import { TestBed } from '@angular/core/testing';

import { TiposDniService } from './tipos-dni.service';

describe('TiposDniService', () => {
  let service: TiposDniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposDniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
