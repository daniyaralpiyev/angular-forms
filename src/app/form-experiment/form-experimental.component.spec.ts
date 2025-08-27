import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExperimental } from './form-experimental.component';

describe('FormExperiment', () => {
  let component: FormExperimental;
  let fixture: ComponentFixture<FormExperimental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormExperimental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExperimental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
