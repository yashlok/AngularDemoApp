import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableSampleComponent } from './observable-sample.component';

describe('ObservableSampleComponent', () => {
  let component: ObservableSampleComponent;
  let fixture: ComponentFixture<ObservableSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableSampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
