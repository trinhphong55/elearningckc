import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LophocContentComponent } from './lophoc-content.component';

describe('LophocContentComponent', () => {
  let component: LophocContentComponent;
  let fixture: ComponentFixture<LophocContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LophocContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LophocContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
