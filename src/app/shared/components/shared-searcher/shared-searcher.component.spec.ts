import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSearcherComponent } from './shared-searcher.component';

describe('SharedSearcherComponent', () => {
  let component: SharedSearcherComponent;
  let fixture: ComponentFixture<SharedSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
