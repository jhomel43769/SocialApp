import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  updateProfilePicture(imageUrl: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/update-profile-picture`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  updateBackgroundPicture(imageUrl: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/update-background-picture`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
