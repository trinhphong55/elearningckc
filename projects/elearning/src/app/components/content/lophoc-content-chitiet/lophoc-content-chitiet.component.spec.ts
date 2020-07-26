import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LophocContentChitietComponent } from './lophoc-content-chitiet.component';

describe('LophocContentChitietComponent', () => {
  let component: LophocContentChitietComponent;
  let fixture: ComponentFixture<LophocContentChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LophocContentChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LophocContentChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
