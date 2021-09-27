import { TestBed } from '@angular/core/testing';

import { PlanesSocialesResolver } from './pagos.resolver';

describe('PlanesSocialesResolver', () => {
  let resolver: PlanesSocialesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PlanesSocialesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
