import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorFilterBarComponent } from './filter-bar.component';

describe('FloorFilterBarComponent', () => {
  let component: FloorFilterBarComponent;
  let fixture: ComponentFixture<FloorFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorFilterBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloorFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
