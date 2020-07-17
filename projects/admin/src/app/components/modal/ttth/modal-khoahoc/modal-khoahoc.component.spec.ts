import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKhoahocComponent } from './modal-khoahoc.component';

describe('ModalKhoahocComponent', () => {
  let component: ModalKhoahocComponent;
  let fixture: ComponentFixture<ModalKhoahocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalKhoahocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
