import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDangkikhoahocComponent } from './modal-dangkikhoahoc.component';

describe('ModalDangkikhoahocComponent', () => {
  let component: ModalDangkikhoahocComponent;
  let fixture: ComponentFixture<ModalDangkikhoahocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDangkikhoahocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDangkikhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
