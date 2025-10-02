import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewRoleComponent } from './list-view-role.component';

describe('ListViewRoleComponent', () => {
  let component: ListViewRoleComponent;
  let fixture: ComponentFixture<ListViewRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListViewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
