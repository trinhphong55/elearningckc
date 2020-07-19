import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLienheComponent } from './modal-lienhe.component';

describe('ModalLienheComponent', () => {
  let component: ModalLienheComponent;
  let fixture: ComponentFixture<ModalLienheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLienheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLienheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
