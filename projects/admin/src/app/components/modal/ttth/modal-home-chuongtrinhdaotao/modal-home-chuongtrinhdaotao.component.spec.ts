import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHomeChuongtrinhdaotaoComponent } from './modal-home-chuongtrinhdaotao.component';

describe('ModalHomeChuongtrinhdaotaoComponent', () => {
  let component: ModalHomeChuongtrinhdaotaoComponent;
  let fixture: ComponentFixture<ModalHomeChuongtrinhdaotaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHomeChuongtrinhdaotaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHomeChuongtrinhdaotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
