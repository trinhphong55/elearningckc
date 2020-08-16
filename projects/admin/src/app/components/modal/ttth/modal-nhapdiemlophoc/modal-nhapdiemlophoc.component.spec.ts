import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNhapdiemlophocComponent } from './modal-nhapdiemlophoc.component';

describe('ModalNhapdiemlophocComponent', () => {
  let component: ModalNhapdiemlophocComponent;
  let fixture: ComponentFixture<ModalNhapdiemlophocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNhapdiemlophocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNhapdiemlophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
