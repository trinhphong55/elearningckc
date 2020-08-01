import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoidungtaileuComponent } from './noidungtaileu.component';

describe('NoidungtaileuComponent', () => {
  let component: NoidungtaileuComponent;
  let fixture: ComponentFixture<NoidungtaileuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidungtaileuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidungtaileuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
