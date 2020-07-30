import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiemsosvComponent } from './diemsosv.component';

describe('DiemsosvComponent', () => {
  let component: DiemsosvComponent;
  let fixture: ComponentFixture<DiemsosvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiemsosvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiemsosvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
