import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCardSkeletonComponent } from './overview-card-skeleton.component';

describe('OverviewCardSkeletonComponent', () => {
  let component: OverviewCardSkeletonComponent;
  let fixture: ComponentFixture<OverviewCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
