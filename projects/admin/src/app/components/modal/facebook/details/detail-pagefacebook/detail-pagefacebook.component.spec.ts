import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPagefacebookComponent } from './detail-pagefacebook.component';

describe('DetailPagefacebookComponent', () => {
  let component: DetailPagefacebookComponent;
  let fixture: ComponentFixture<DetailPagefacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPagefacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPagefacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
