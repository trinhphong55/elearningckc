import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SodiemComponent } from './sodiem.component';

describe('SodiemComponent', () => {
  let component: SodiemComponent;
  let fixture: ComponentFixture<SodiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SodiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SodiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
