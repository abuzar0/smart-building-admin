import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePremissionFormComponent } from './role-premission-form.component';

describe('RolePremissionFormComponent', () => {
  let component: RolePremissionFormComponent;
  let fixture: ComponentFixture<RolePremissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePremissionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolePremissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
