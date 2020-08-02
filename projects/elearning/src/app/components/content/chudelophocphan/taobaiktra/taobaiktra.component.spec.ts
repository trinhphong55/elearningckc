import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaobaiktraComponent } from './taobaiktra.component';

describe('TaobaiktraComponent', () => {
  let component: TaobaiktraComponent;
  let fixture: ComponentFixture<TaobaiktraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaobaiktraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaobaiktraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
