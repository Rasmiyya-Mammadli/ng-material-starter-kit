import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiBaseUrl = 'https://636ce2d8ab4814f2b2712854.mockapi.io';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<any[]> {
    const url = `${this.apiBaseUrl}/car-brands`;
    return this.http.get<any[]>(url);
  }

  getSecurityFeatures(): Observable<any[]> {
    const url = `${this.apiBaseUrl}/car-security-features`;
    return this.http.get<any[]>(url);
  }

  getComfortFeatures(): Observable<any[]> {
    const url = `${this.apiBaseUrl}/car-comfort-features`;
    return this.http.get<any[]>(url);
  }

  submitFormData(formData: any): Observable<any> {
    const apiUrl = `${this.apiBaseUrl}/cars`; // Replace with the actual endpoint
    return this.http.post(apiUrl, formData);
  }
}
