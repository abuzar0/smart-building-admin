import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorHeaderComponent } from './dashboard-header.component';

describe('FloorHeaderComponent', () => {
  let component: FloorHeaderComponent;
  let fixture: ComponentFixture<FloorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
