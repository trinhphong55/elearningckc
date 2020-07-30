import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaolophocComponent } from './taolophoc.component';

describe('TaolophocComponent', () => {
  let component: TaolophocComponent;
  let fixture: ComponentFixture<TaolophocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaolophocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaolophocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
