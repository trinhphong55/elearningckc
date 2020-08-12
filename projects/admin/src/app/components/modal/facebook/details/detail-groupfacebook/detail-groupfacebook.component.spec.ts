import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGroupfacebookComponent } from './detail-groupfacebook.component';

describe('DetailGroupfacebookComponent', () => {
  let component: DetailGroupfacebookComponent;
  let fixture: ComponentFixture<DetailGroupfacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGroupfacebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGroupfacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
