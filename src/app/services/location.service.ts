import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:4000';
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    })
  }
  constructor(private http: HttpClient) { }
  getCategories(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/categories`);
  }
  getLocations(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/locations`);
  }
  getLocationById(location_id: any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/location/${location_id}`)
  }
  addLocation(location : FormData): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/user/upload`, location);
  }
  searchLocation(key: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/location`, {key: key});
  }

  //admin
  getAdminLocations():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/auth/locations`);
  }
  getAdminCategories(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/auth/categories`);
  }

  //Thêm location vào favourite list
  addOrRemoveFavouriteLocation(user_id: any, location_id: any): Observable<any>{
    const data = { user_id: user_id, location_id: location_id };
    return this.http.post<any>(`${this.apiUrl}/user/${user_id}/favorite/${location_id}`, data)
  }  
}
