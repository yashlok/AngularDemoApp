import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-unittest',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './unittest.component.html',
  styleUrl: './unittest.component.css'
})
export class UnittestComponent {

  num1: number=0;
  num2: number=0;
  total: number = 0;
  products: Product[] = [];
  productService = inject(ProductService);

  frm: FormGroup;

  constructor(){

    this.frm = new FormGroup({
      customerId: new FormControl(),
      customerName: new FormControl('',[Validators.required])
    });
  }

  loadProducts(){
    this.productService.getProducts().subscribe({
      next:(response) => {
        this.products = response;
        this.num1 = this.products[0].productId||0;
      },
      error: (err) => {

      }
    })
  }

  addition(){
    this.total = this.num1 + this.num2;
  }

  saveCustomer(){
    if(this.frm.valid){
      alert('Customer saved succesfully');
    }
  }
}
