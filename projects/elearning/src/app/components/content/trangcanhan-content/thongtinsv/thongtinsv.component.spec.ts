import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinsvComponent } from './thongtinsv.component';

describe('ThongtinsvComponent', () => {
  let component: ThongtinsvComponent;
  let fixture: ComponentFixture<ThongtinsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
