import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExperiment } from './form-experiment';

describe('FormExperiment', () => {
  let component: FormExperiment;
  let fixture: ComponentFixture<FormExperiment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormExperiment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExperiment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
