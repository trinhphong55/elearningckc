import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDangkidotthiComponent } from './page-dangkidotthi.component';

describe('PageDangkidotthiComponent', () => {
  let component: PageDangkidotthiComponent;
  let fixture: ComponentFixture<PageDangkidotthiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDangkidotthiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDangkidotthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
