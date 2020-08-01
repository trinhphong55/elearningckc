import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XembaitapsvComponent } from './xembaitapsv.component';

describe('XembaitapsvComponent', () => {
  let component: XembaitapsvComponent;
  let fixture: ComponentFixture<XembaitapsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XembaitapsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XembaitapsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
