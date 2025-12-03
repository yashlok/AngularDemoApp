import { Component, inject, OnDestroy } from '@angular/core';
import { Product } from '../../models/product';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-product-template-driven',
  imports: [
    FormsModule
  ],
  templateUrl: './product-template-driven.component.html',
  styleUrl: './product-template-driven.component.css'
})
export class ProductTemplateDrivenComponent implements OnDestroy {

  product: Product;
  productService = inject(ProductService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  isEditMode: boolean = false;
  subscriptions: Subscription[] = [];
  messageService= inject(MessageService);

  constructor() {
    this.product = new Product();
    console.log('Step 1');
    this.subscriptions.push(this.activatedRoute.queryParams.subscribe(data => {
      let pid = data['pid'];
      if (pid !== undefined) {
        this.productService.getProductById(pid).subscribe({
          next: (resp) => {
            this.product = resp;
            this.isEditMode = true;
            console.log('Step 2');
          }
        })
      }
    }))
    console.log('Step 3');
  }

  ngOnDestroy(): void {
    console.log('Product Template Driven Component destroyed');
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

  saveProduct(frm: NgForm) {
    if (frm.valid) {
      if (!this.isEditMode) {
        this.subscriptions.push(this.productService.addProduct(this.product).subscribe({
          next: (response) => {
            if (response) {
              this.messageService.notifyMessage('Product saved successfully');
              this.router.navigate(['product-list']);
            }
          },
          error: (err) => {
            console.log('Error', err);
          },
          complete: () => {
            console.log('End of execution');
          }
        })
        )
      }
      else {
        //else logic for update
      }
    }
    else {
      alert('Validation failure');
    }
  }
}
