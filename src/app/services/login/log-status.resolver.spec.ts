import { TestBed } from '@angular/core/testing';

import { LogStatusResolver } from './log-status.resolver';

describe('LogStatusResolver', () => {
  let resolver: LogStatusResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LogStatusResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
