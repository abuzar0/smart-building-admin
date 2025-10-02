import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewPermissionComponent } from './list-view-permission.component';

describe('ListViewPermissionComponent', () => {
  let component: ListViewPermissionComponent;
  let fixture: ComponentFixture<ListViewPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListViewPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
