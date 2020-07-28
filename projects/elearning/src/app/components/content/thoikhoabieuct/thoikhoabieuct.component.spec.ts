import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoikhoabieuctComponent } from './thoikhoabieuct.component';

describe('ThoikhoabieuctComponent', () => {
  let component: ThoikhoabieuctComponent;
  let fixture: ComponentFixture<ThoikhoabieuctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoikhoabieuctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoikhoabieuctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
