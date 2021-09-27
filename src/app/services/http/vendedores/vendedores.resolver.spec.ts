import { TestBed } from '@angular/core/testing';

import { VendedoresResolver } from './vendedores.resolver';

describe('VendedoresResolver', () => {
  let resolver: VendedoresResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VendedoresResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
