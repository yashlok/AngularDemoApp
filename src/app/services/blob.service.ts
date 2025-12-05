import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blob } from '../models/blob';

@Injectable({
  providedIn: 'root'
})
export class BlobService {
  private getUrl = 'https://localhost:7149/api/Storage/Get';
  private uploadUrl = 'https://localhost:7149/api/Storage/upload';

  constructor(private http: HttpClient) { }

  getBlobs(): Observable<Blob[]> {
    return this.http.get<Blob[]>(this.getUrl);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.uploadUrl, formData);
  }
}