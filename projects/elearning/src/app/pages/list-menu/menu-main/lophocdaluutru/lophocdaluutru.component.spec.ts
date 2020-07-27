import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LophocdaluutruComponent } from './lophocdaluutru.component';

describe('LophocdaluutruComponent', () => {
  let component: LophocdaluutruComponent;
  let fixture: ComponentFixture<LophocdaluutruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LophocdaluutruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LophocdaluutruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
