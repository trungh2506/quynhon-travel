import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'accessToken';
  private apiUrl = 'http://localhost:4000';
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    })
  }
  constructor(private http: HttpClient) { }

  login(Email: string, Password: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, { Email, Password });
  }
  register(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
  }
  saveToken(token: any){
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY);  
  }
  isLoggedIn(){
    return !!this.getToken();
  }
  decodedToken(){
    const token = this.getToken();
    const helper = new JwtHelperService();
    if(token){
      return helper.decodeToken(token);
    }
  }
}
