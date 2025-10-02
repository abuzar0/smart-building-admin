import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSearchInputComponent } from './select-search-input.component';

describe('SelectSearchInputComponent', () => {
  let component: SelectSearchInputComponent;
  let fixture: ComponentFixture<SelectSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSearchInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
