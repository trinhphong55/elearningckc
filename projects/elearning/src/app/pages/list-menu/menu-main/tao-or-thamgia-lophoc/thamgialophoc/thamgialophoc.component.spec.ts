import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamgialophocComponent } from './thamgialophoc.component';

describe('ThamgialophocComponent', () => {
  let component: ThamgialophocComponent;
  let fixture: ComponentFixture<ThamgialophocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThamgialophocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThamgialophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
