import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoidungbaitapsvComponent } from './noidungbaitapsv.component';

describe('NoidungbaitapsvComponent', () => {
  let component: NoidungbaitapsvComponent;
  let fixture: ComponentFixture<NoidungbaitapsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidungbaitapsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidungbaitapsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
