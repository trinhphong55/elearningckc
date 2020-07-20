import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTintucComponent } from './page-tintuc.component';

describe('PageTintucComponent', () => {
  let component: PageTintucComponent;
  let fixture: ComponentFixture<PageTintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
