import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangcanhanContentComponent } from './trangcanhan-content.component';

describe('TrangcanhanContentComponent', () => {
  let component: TrangcanhanContentComponent;
  let fixture: ComponentFixture<TrangcanhanContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangcanhanContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangcanhanContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
