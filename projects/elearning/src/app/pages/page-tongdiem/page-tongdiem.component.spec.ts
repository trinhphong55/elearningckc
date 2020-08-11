import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTongdiemComponent } from './page-tongdiem.component';

describe('PageTongdiemComponent', () => {
  let component: PageTongdiemComponent;
  let fixture: ComponentFixture<PageTongdiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTongdiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTongdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
