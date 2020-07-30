import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoikhoabieusvComponent } from './thoikhoabieusv.component';

describe('ThoikhoabieusvComponent', () => {
  let component: ThoikhoabieusvComponent;
  let fixture: ComponentFixture<ThoikhoabieusvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoikhoabieusvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoikhoabieusvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
