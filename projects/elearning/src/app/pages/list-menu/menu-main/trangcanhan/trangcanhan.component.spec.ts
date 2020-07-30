import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangcanhanComponent } from './trangcanhan.component';

describe('TrangcanhanComponent', () => {
  let component: TrangcanhanComponent;
  let fixture: ComponentFixture<TrangcanhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangcanhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangcanhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
