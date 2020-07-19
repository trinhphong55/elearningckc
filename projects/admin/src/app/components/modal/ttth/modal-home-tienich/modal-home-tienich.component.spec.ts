import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHomeTienichComponent } from './modal-home-tienich.component';

describe('ModalHomeTienichComponent', () => {
  let component: ModalHomeTienichComponent;
  let fixture: ComponentFixture<ModalHomeTienichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHomeTienichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHomeTienichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
