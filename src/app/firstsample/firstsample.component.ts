import { Component, inject, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { forkJoin } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
@Component({
  selector: 'app-firstsample',
  imports: [    
  ],
  templateUrl: './firstsample.component.html',
  styleUrl: './firstsample.component.css'
})
export class FirstsampleComponent implements OnInit {
   products: Product[];
   productService = inject(ProductService);
  loggerService = inject(LoggerService);

  categories: Category[];
 // categoryService = inject(CategoryService);   
  constructor(){
    this.products = [];
    this.categories = [];
    this.loggerService.setName("Yashlok");
  }
   
  ngOnInit(): void {
  //forkJoin({
    products: this.productService.getProducts(),
    // categories: this.categoryService.getCategories(),
  
 // }).subscribe({
   // next: (result) => {
      console.log("All APIs Success!");
     // console.log(result.products);
      //console.log(result.categories);
      // Continue only if all API calls succeed
     // this.loadDashboard(result);
   // },
   // error: (err) => {
    //  console.error("An API failed:", err);
    //}
  //});

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

//  private loadCategories() {
//      this.categoryService.getCategories().subscribe({
//        next: (resp) => {
//         this.categories = resp;
//       },
//        error: (err) => {
//         console.log("Error", err);
//        }
//      })
//   }

}

//All APIs independent, run in parallel	      forkJoin
//API2 depends on API1 result	               switchMap
//Run API calls one after another	           oncatMap