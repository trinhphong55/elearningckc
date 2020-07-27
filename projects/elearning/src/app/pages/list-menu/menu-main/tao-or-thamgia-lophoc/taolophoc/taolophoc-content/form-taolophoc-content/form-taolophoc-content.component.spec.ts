import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaolophocContentComponent } from './form-taolophoc-content.component';

describe('FormTaolophocContentComponent', () => {
  let component: FormTaolophocContentComponent;
  let fixture: ComponentFixture<FormTaolophocContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTaolophocContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTaolophocContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
