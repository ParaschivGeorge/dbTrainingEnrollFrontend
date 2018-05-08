import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpocFormComponent } from './spoc-form.component';

describe('SpocFormComponent', () => {
  let component: SpocFormComponent;
  let fixture: ComponentFixture<SpocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
