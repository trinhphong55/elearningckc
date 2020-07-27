import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaitaptrenlopComponent } from './baitaptrenlop.component';

describe('BaitaptrenlopComponent', () => {
  let component: BaitaptrenlopComponent;
  let fixture: ComponentFixture<BaitaptrenlopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaitaptrenlopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaitaptrenlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
