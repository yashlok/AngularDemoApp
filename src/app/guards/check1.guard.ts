import { CanDeactivateFn } from '@angular/router';
import { ProductModelDrivenComponent } from '../product/product-model-driven/product-model-driven.component';

export const check1Guard: CanDeactivateFn<ProductModelDrivenComponent> = (component, currentRoute, currentState, nextState) => {

  if (component.frm.valid) {
    let confirmDelete = confirm('Do you wish to save & leave the page?');

    if (confirmDelete) {
      component.saveProduct();
    }
    return confirmDelete;
  }
  return true;
};
