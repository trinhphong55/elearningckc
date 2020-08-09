import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTtthLophocComponent } from './modal-ttth-lophoc.component';

describe('ModalTtthLophocComponent', () => {
  let component: ModalTtthLophocComponent;
  let fixture: ComponentFixture<ModalTtthLophocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTtthLophocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTtthLophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
