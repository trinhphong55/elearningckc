import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaotailieuComponent } from './taotailieu.component';

describe('TaotailieuComponent', () => {
  let component: TaotailieuComponent;
  let fixture: ComponentFixture<TaotailieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaotailieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaotailieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
