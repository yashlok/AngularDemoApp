import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplateDrivenComponent } from './product-template-driven.component';

describe('ProductTemplateDrivenComponent', () => {
  let component: ProductTemplateDrivenComponent;
  let fixture: ComponentFixture<ProductTemplateDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTemplateDrivenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
