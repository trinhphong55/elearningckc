import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoinguoiComponent } from './moinguoi.component';

describe('MoinguoiComponent', () => {
  let component: MoinguoiComponent;
  let fixture: ComponentFixture<MoinguoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoinguoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoinguoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
