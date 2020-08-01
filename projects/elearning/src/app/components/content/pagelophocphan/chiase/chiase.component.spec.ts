import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiaseComponent } from './chiase.component';

describe('ChiaseComponent', () => {
  let component: ChiaseComponent;
  let fixture: ComponentFixture<ChiaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
