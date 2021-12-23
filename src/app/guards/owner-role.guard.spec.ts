import { TestBed } from '@angular/core/testing';

import { OwnerRoleGuard } from './owner-role.guard';

describe('OwnerRoleGuard', () => {
  let guard: OwnerRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OwnerRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
