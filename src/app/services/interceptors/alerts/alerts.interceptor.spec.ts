import { TestBed } from '@angular/core/testing';

import { AlertsInterceptor } from './alerts.interceptor';

describe('AlertsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AlertsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AlertsInterceptor = TestBed.inject(AlertsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
