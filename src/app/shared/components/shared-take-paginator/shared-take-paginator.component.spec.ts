import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTakePaginatorComponent } from './shared-take-paginator.component';

describe('SharedTakePaginatorComponent', () => {
  let component: SharedTakePaginatorComponent;
  let fixture: ComponentFixture<SharedTakePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedTakePaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTakePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
