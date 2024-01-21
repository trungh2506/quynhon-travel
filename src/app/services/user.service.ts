import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'http://localhost:4000';
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    })
  }
  constructor(private http : HttpClient) { }
  getUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/auth/users`);
  }
  //User
  getUserInfoById(user_id: any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/user/${user_id}`);
  }
  //Admin
  deleteUser(user_id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/auth/user/${user_id}`);
  }
}
