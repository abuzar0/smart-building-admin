import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormStepOneComponent } from './user-form-step-one.component';

describe('UserFormStepOneComponent', () => {
  let component: UserFormStepOneComponent;
  let fixture: ComponentFixture<UserFormStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormStepOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
