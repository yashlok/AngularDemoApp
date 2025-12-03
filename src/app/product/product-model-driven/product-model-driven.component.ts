import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyValidators } from '../../customs/validators';

@Component({
  selector: 'app-product-model-driven',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-model-driven.component.html',
  styleUrl: './product-model-driven.component.css'
})
export class ProductModelDrivenComponent {

  frm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.frm = this.fb.group({
      productId: this.fb.control('', [Validators.required]),
      productCode: this.fb.control('', { updateOn: 'blur', validators: MyValidators.codeValdiator }),
      productName: this.fb.control('', [Validators.required]),
      price: this.fb.control(''),
      description: this.fb.group({
        shortDesc: this.fb.control(''),
        fullDesc: this.fb.control('')
      }),
      sizes: this.fb.array(
        [
          this.fb.control('')
          , this.fb.control('')
        ]
      )
    })

    this.frm.get('productCode')?.valueChanges.subscribe(data => {
      console.log(data);
      let priceCtrl = this.frm.get('price');
      priceCtrl?.clearValidators();
      if (data != null && data.indexOf('P') !== 0) {
        priceCtrl?.setValidators(Validators.required);
      }
      priceCtrl?.updateValueAndValidity();
    })
  }

  get getSizes(): FormArray {
    return this.frm.get('sizes') as FormArray;
  }

  saveProduct() {
    if (this.frm.valid) {
      let data = JSON.stringify(this.frm.value);
      alert('Product Saved successfully.' + data);
    }
  }

  enableValidation() {
    //find the control
    let productNameCtrl = this.frm.get('productName');

    //enable the validation
    productNameCtrl?.addValidators([Validators.pattern('^[a-zA-Z0-9 ]+$')]);

    //apply changes
    productNameCtrl?.updateValueAndValidity();
  }

  addMore() {
    let newSizeCtrl = this.fb.control('');
    this.getSizes.controls.push(newSizeCtrl);
  }

  reset() {
    this.frm.reset({
      productId: 0
    })
  }

  update() {
    let productToUpate = {
      productId: 123
      , productName: 'test'
      , price: 1000,
      description: {
        shortDesc: "short desc"
      },
    };

    this.frm.patchValue(productToUpate);
  }
}
