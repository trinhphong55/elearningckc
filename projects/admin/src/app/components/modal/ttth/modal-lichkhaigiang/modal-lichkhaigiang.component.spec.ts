import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLichkhaigiangComponent } from './modal-lichkhaigiang.component';

describe('ModalLichkhaigiangComponent', () => {
  let component: ModalLichkhaigiangComponent;
  let fixture: ComponentFixture<ModalLichkhaigiangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLichkhaigiangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLichkhaigiangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
