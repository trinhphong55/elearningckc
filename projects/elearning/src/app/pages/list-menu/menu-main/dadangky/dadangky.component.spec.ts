import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadangkyComponent } from './dadangky.component';

describe('DadangkyComponent', () => {
  let component: DadangkyComponent;
  let fixture: ComponentFixture<DadangkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadangkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
