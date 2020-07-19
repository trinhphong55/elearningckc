import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHomeCamonComponent } from './modal-home-camon.component';

describe('ModalHomeCamonComponent', () => {
  let component: ModalHomeCamonComponent;
  let fixture: ComponentFixture<ModalHomeCamonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHomeCamonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHomeCamonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
