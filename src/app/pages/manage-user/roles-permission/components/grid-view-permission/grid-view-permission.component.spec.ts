import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewPermissionComponent } from './grid-view-permission.component';

describe('GridViewPermissionComponent', () => {
  let component: GridViewPermissionComponent;
  let fixture: ComponentFixture<GridViewPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridViewPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
