import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoidungtailieusvComponent } from './noidungtailieusv.component';

describe('NoidungtailieusvComponent', () => {
  let component: NoidungtailieusvComponent;
  let fixture: ComponentFixture<NoidungtailieusvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidungtailieusvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidungtailieusvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
