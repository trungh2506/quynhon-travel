import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService : AuthService, private messageService : MessageService) { }
  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    if (!this.isAdmin()) {
      this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Bạn không phải là Admin' });
      return false;
    }
    return true;
  }

  isAdmin(){
    if(this.authService.decodedToken().role === true){
      return true;
    }
    return false;
  }
}
