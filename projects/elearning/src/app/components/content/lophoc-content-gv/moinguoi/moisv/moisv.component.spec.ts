import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoisvComponent } from './moisv.component';

describe('MoisvComponent', () => {
  let component: MoisvComponent;
  let fixture: ComponentFixture<MoisvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoisvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoisvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
