import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTintucComponent } from './modal-tintuc.component';

describe('ModalTintucComponent', () => {
  let component: ModalTintucComponent;
  let fixture: ComponentFixture<ModalTintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
