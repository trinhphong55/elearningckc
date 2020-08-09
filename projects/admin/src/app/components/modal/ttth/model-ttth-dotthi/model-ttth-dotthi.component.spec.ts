import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTtthDotthiComponent } from './model-ttth-dotthi.component';

describe('ModelTtthDotthiComponent', () => {
  let component: ModelTtthDotthiComponent;
  let fixture: ComponentFixture<ModelTtthDotthiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTtthDotthiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTtthDotthiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
