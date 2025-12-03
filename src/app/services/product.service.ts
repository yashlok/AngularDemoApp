import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cachedData: any;

  httpClient = inject(HttpClient);
  constructor() { }
getProducts(): Observable<any> { 
   if (this.cachedData) {
          return of(this.cachedData); // Return cached data immediately
        } else {
                                         // https://fake-store-api.mock.beeceptor.com/api/products
    return this.httpClient.get<Product[]>(`${environment.BASEURL}/api/products`).pipe(
            tap(data => this.cachedData = data) // Cache data after fetching
          );
        }
  }
   
   // Method to clear cache if needed (e.g., on logout or data update)
      clearCache() {
        this.cachedData = null;
      }

  // getProducts() {    
  //   return this.httpClient.get<Product[]>(`${environment.BASEURL}/api/ProductAPI/getall`);
  // }

  addProduct(productToAdd: Product) {
    let data = JSON.stringify(productToAdd);
    let myheader = new HttpHeaders({"Content-Type":"application/json"});
    return this.httpClient.post<boolean>(`${environment.BASEURL}/api/ProductAPI/add`, data, {headers: myheader});
  }

  deleteProduct(pid: number) {
    return this.httpClient.delete<boolean>(`${environment.BASEURL}/api/ProductAPI/delete/${pid}`);
  }

  getProductById(pid: number) {
    return this.httpClient.get<Product>(`${environment.BASEURL}/api/ProductAPI/get/${pid}`);
  }


}
