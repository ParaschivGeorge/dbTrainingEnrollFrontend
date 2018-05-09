import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingFormComponent } from './add-training-form.component';

describe('AddTrainingFormComponent', () => {
  let component: AddTrainingFormComponent;
  let fixture: ComponentFixture<AddTrainingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
