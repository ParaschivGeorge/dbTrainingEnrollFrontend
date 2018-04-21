import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmFormComponent } from './pm-form.component';

describe('PmFormComponent', () => {
  let component: PmFormComponent;
  let fixture: ComponentFixture<PmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
