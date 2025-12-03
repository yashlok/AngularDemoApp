import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   httpClient = inject(HttpClient);
  constructor() { }
  getCategories(): Observable<any> {    
    return this.httpClient.get<Category[]>(`${environment.BASEURL}/api/CategoryAPI/getall`);
  }
}
