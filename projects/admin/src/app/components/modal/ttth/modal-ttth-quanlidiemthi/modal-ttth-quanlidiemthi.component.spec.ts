import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTtthQuanlidiemthiComponent } from './modal-ttth-quanlidiemthi.component';

describe('ModalTtthQuanlidiemthiComponent', () => {
  let component: ModalTtthQuanlidiemthiComponent;
  let fixture: ComponentFixture<ModalTtthQuanlidiemthiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTtthQuanlidiemthiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTtthQuanlidiemthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
