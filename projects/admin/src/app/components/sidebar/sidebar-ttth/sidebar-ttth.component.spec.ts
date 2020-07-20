import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTtthComponent } from './sidebar-ttth.component';

describe('SidebarTtthComponent', () => {
  let component: SidebarTtthComponent;
  let fixture: ComponentFixture<SidebarTtthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTtthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTtthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
