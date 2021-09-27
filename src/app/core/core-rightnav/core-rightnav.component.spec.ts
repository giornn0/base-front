import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreRightnavComponent } from './core-rightnav.component';

describe('CoreRightnavComponent', () => {
  let component: CoreRightnavComponent;
  let fixture: ComponentFixture<CoreRightnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreRightnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreRightnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
