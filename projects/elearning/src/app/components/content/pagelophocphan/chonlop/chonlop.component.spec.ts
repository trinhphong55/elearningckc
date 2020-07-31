import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonlopComponent } from './chonlop.component';

describe('ChonlopComponent', () => {
  let component: ChonlopComponent;
  let fixture: ComponentFixture<ChonlopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonlopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
