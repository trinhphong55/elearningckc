import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoidungbaitapComponent } from './noidungbaitap.component';

describe('NoidungbaitapComponent', () => {
  let component: NoidungbaitapComponent;
  let fixture: ComponentFixture<NoidungbaitapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidungbaitapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidungbaitapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
