import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLienheComponent } from './page-lienhe.component';

describe('PageLienheComponent', () => {
  let component: PageLienheComponent;
  let fixture: ComponentFixture<PageLienheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLienheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLienheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
