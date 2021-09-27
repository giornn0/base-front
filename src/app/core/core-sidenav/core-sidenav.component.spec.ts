import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreSidenavComponent } from './core-sidenav.component';

describe('CoreSidenavComponent', () => {
  let component: CoreSidenavComponent;
  let fixture: ComponentFixture<CoreSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
