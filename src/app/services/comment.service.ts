import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = 'http://localhost:4000';
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type' : 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    })
  }
  constructor(private http : HttpClient) { }
  getCommentByLocationId(location_id: any){
    return this.http.get<any>(`${this.apiUrl}/comments/${location_id}`);
  }
}
