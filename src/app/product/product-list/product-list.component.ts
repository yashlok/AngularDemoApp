import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[];
  productService = inject(ProductService);
  router = inject(Router);
  messageService= inject(MessageService);
  constructor() {
    this.products = [];
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  
  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.log("Error", err);
      }
    })
  }

  editProduct(id: number|undefined){
    this.router.navigate(['templatedriven'], { queryParams: {pid: id}});
  }

  

   deleteProduct(prod: Product) {
    //let confirmDelete = confirm(`Do you wish to delete ${prod.productName}?`);
  //   if (confirmDelete) {
  //     this.productService.deleteProduct(prod.productId ?? 0).subscribe({
  //       next: (resp) => {
  //         if (resp) {
  //           this.messageService.notifyMessage('Product is deleted successfully');
  //           this.loadProducts();
  //         }
  //       }
  //     })
  //   }
   }

}
