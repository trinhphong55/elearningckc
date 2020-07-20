import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDangkikhoahocComponent } from './page-dangkikhoahoc.component';

describe('PageDangkikhoahocComponent', () => {
  let component: PageDangkikhoahocComponent;
  let fixture: ComponentFixture<PageDangkikhoahocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDangkikhoahocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDangkikhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
