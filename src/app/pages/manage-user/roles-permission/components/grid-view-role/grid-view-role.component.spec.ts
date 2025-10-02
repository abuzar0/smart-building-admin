import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewRoleComponent } from './grid-view-role.component';

describe('GridViewRoleComponent', () => {
  let component: GridViewRoleComponent;
  let fixture: ComponentFixture<GridViewRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridViewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
