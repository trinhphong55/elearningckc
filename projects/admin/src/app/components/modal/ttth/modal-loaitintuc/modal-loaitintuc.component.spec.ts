import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoaitintucComponent } from './modal-loaitintuc.component';

describe('ModalLoaitintucComponent', () => {
  let component: ModalLoaitintucComponent;
  let fixture: ComponentFixture<ModalLoaitintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoaitintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoaitintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
