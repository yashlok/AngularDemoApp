import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstsampleComponent } from './firstsample.component';

describe('FirstsampleComponent', () => {
  let component: FirstsampleComponent;
  let fixture: ComponentFixture<FirstsampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstsampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
