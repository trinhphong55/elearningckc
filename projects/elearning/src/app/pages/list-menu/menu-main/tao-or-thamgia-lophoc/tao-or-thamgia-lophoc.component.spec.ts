import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoOrThamgiaLophocComponent } from './tao-or-thamgia-lophoc.component';

describe('TaoOrThamgiaLophocComponent', () => {
  let component: TaoOrThamgiaLophocComponent;
  let fixture: ComponentFixture<TaoOrThamgiaLophocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoOrThamgiaLophocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoOrThamgiaLophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
