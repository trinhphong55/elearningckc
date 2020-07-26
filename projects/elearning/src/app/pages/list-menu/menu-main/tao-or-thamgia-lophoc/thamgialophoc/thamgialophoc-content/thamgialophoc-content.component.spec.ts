import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamgialophocContentComponent } from './thamgialophoc-content.component';

describe('ThamgialophocContentComponent', () => {
  let component: ThamgialophocContentComponent;
  let fixture: ComponentFixture<ThamgialophocContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThamgialophocContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThamgialophocContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
