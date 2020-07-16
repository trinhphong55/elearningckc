import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTtthComponent } from './page-ttth.component';

describe('PageTtthComponent', () => {
  let component: PageTtthComponent;
  let fixture: ComponentFixture<PageTtthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTtthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTtthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
