import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTracuudiemComponent } from './page-tracuudiem.component';

describe('PageTracuudiemComponent', () => {
  let component: PageTracuudiemComponent;
  let fixture: ComponentFixture<PageTracuudiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTracuudiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTracuudiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
