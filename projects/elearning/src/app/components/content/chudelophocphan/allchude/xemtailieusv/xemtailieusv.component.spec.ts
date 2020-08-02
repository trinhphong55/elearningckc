import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XemtailieusvComponent } from './xemtailieusv.component';

describe('XemtailieusvComponent', () => {
  let component: XemtailieusvComponent;
  let fixture: ComponentFixture<XemtailieusvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XemtailieusvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XemtailieusvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
