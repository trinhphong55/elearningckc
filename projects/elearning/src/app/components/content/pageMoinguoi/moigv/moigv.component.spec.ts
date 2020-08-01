import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoigvComponent } from './moigv.component';

describe('MoigvComponent', () => {
  let component: MoigvComponent;
  let fixture: ComponentFixture<MoigvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoigvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoigvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
