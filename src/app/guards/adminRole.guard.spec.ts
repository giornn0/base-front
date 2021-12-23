import { TestBed } from '@angular/core/testing';

import { AdminRoleGuard } from './adminRole.guard';

describe('RoleGuard', () => {
  let guard: AdminRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
