import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaitapComponent } from './taobaitap.component';

describe('TaobaitapComponent', () => {
  let component: TaobaitapComponent;
  let fixture: ComponentFixture<TaobaitapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaobaitapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaobaitapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
