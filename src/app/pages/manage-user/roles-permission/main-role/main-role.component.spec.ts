import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRoleComponent } from './main-role.component';

describe('MainRoleComponent', () => {
  let component: MainRoleComponent;
  let fixture: ComponentFixture<MainRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
