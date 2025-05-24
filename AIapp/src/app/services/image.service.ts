import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:3000/api/image';

  constructor(private http: HttpClient) {}

  uploadImageFromUrl(description: string, imageUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/images/upload`, {
      description,
      imageUrl,
    });
  }

  getImageById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/${id}`);
  }

  deleteImageById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/images/${id}`);
  }
}
