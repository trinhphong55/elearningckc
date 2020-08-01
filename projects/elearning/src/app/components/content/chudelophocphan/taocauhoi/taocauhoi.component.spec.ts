import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaocauhoiComponent } from './taocauhoi.component';

describe('TaocauhoiComponent', () => {
  let component: TaocauhoiComponent;
  let fixture: ComponentFixture<TaocauhoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaocauhoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaocauhoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
