import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaochudeComponent } from './taochude.component';

describe('TaochudeComponent', () => {
  let component: TaochudeComponent;
  let fixture: ComponentFixture<TaochudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaochudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaochudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
