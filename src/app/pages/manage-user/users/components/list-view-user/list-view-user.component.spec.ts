import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewUserComponent } from './list-view-user.component';

describe('ListViewUserComponent', () => {
  let component: ListViewUserComponent;
  let fixture: ComponentFixture<ListViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
