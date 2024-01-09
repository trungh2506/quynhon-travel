import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  getCommentByLocationId(location_id: any) : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/comments/${location_id}`);
  }
  postComment(comment: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/user/comment`, comment)
  }
}
