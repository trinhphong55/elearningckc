import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XembaitapgvComponent } from './xembaitapgv.component';

describe('XembaitapgvComponent', () => {
  let component: XembaitapgvComponent;
  let fixture: ComponentFixture<XembaitapgvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XembaitapgvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XembaitapgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
