import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private authService : AuthService, private router: Router) { }
  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }
  // logged in, so return true
  this.authService.isLoggedIn();
  return true;
}
}
