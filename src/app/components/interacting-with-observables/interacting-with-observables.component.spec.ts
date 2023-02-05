import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractingWithObservablesComponent } from './interacting-with-observables.component';

describe('InteractingWithObservablesComponent', () => {
  let component: InteractingWithObservablesComponent;
  let fixture: ComponentFixture<InteractingWithObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractingWithObservablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractingWithObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
