import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoikhoabieuchitietComponent } from './thoikhoabieuchitiet.component';

describe('ThoikhoabieuchitietComponent', () => {
  let component: ThoikhoabieuchitietComponent;
  let fixture: ComponentFixture<ThoikhoabieuchitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoikhoabieuchitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoikhoabieuchitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
