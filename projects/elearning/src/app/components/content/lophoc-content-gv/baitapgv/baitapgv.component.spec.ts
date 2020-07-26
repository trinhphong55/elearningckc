import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaitapgvComponent } from './baitapgv.component';

describe('BaitapgvComponent', () => {
  let component: BaitapgvComponent;
  let fixture: ComponentFixture<BaitapgvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaitapgvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaitapgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
