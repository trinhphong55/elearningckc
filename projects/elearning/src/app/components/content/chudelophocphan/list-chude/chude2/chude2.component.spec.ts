import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chude2Component } from './chude2.component';

describe('Chude2Component', () => {
  let component: Chude2Component;
  let fixture: ComponentFixture<Chude2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chude2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chude2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
