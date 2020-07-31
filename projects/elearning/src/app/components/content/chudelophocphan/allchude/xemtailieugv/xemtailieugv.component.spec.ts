import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemtailieugvComponent } from './xemtailieugv.component';

describe('XemtailieugvComponent', () => {
  let component: XemtailieugvComponent;
  let fixture: ComponentFixture<XemtailieugvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemtailieugvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemtailieugvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
