import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDanhsachlophocComponent } from './page-danhsachlophoc.component';

describe('PageDanhsachlophocComponent', () => {
  let component: PageDanhsachlophocComponent;
  let fixture: ComponentFixture<PageDanhsachlophocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDanhsachlophocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDanhsachlophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
