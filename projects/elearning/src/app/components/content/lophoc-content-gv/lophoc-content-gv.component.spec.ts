import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LophocContentGvComponent } from './lophoc-content-gv.component';

describe('LophocContentGvComponent', () => {
  let component: LophocContentGvComponent;
  let fixture: ComponentFixture<LophocContentGvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LophocContentGvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LophocContentGvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
