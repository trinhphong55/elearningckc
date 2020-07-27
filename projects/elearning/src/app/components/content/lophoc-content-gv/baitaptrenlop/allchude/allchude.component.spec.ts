import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllchudeComponent } from './allchude.component';

describe('AllchudeComponent', () => {
  let component: AllchudeComponent;
  let fixture: ComponentFixture<AllchudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllchudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllchudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
