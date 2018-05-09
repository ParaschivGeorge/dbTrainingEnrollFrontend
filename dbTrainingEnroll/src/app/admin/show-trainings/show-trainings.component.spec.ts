import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrainingsComponent } from './show-trainings.component';

describe('ShowTrainingsComponent', () => {
  let component: ShowTrainingsComponent;
  let fixture: ComponentFixture<ShowTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
