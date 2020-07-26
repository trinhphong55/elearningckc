import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaolophocContentComponent } from './taolophoc-content.component';

describe('TaolophocContentComponent', () => {
  let component: TaolophocContentComponent;
  let fixture: ComponentFixture<TaolophocContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaolophocContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaolophocContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
