import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiemthiComponent } from './modal-diemthi.component';

describe('ModalDiemthiComponent', () => {
  let component: ModalDiemthiComponent;
  let fixture: ComponentFixture<ModalDiemthiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDiemthiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiemthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
