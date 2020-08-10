import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDangkidotthiComponent } from './modal-dangkidotthi.component';

describe('ModalDangkidotthiComponent', () => {
  let component: ModalDangkidotthiComponent;
  let fixture: ComponentFixture<ModalDangkidotthiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDangkidotthiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDangkidotthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
