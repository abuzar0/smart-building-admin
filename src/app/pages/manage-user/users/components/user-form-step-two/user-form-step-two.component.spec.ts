import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormStepTwoComponent } from './user-form-step-two.component';

describe('UserFormStepTwoComponent', () => {
  let component: UserFormStepTwoComponent;
  let fixture: ComponentFixture<UserFormStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormStepTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
