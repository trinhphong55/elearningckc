import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHomeChuongtrinhdaodaoComponent } from './modal-home-chuongtrinhdaodao.component';

describe('ModalHomeChuongtrinhdaodaoComponent', () => {
  let component: ModalHomeChuongtrinhdaodaoComponent;
  let fixture: ComponentFixture<ModalHomeChuongtrinhdaodaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHomeChuongtrinhdaodaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHomeChuongtrinhdaodaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
