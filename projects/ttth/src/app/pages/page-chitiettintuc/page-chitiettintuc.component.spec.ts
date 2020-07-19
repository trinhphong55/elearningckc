import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChitiettintucComponent } from './page-chitiettintuc.component';

describe('PageChitiettintucComponent', () => {
  let component: PageChitiettintucComponent;
  let fixture: ComponentFixture<PageChitiettintucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageChitiettintucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageChitiettintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
