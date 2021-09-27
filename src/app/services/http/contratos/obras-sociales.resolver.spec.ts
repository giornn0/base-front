import { TestBed } from '@angular/core/testing';

import { ObrasSocialesResolver } from './contratos.resolver';

describe('ObrasSocialesResolver', () => {
  let resolver: ObrasSocialesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ObrasSocialesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
