import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPlaceholderComponent } from './not-found-placeholder.component';

describe('NotFoundPlaceholderComponent', () => {
  let component: NotFoundPlaceholderComponent;
  let fixture: ComponentFixture<NotFoundPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotFoundPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
