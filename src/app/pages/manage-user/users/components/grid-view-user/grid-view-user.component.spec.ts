import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewUserComponent } from './grid-view-user.component';

describe('GridViewUserComponent', () => {
  let component: GridViewUserComponent;
  let fixture: ComponentFixture<GridViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
