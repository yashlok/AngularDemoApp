import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModelDrivenComponent } from './product-model-driven.component';

describe('ProductModelDrivenComponent', () => {
  let component: ProductModelDrivenComponent;
  let fixture: ComponentFixture<ProductModelDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModelDrivenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductModelDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
