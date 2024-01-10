import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;
  constructor(private authService : AuthService, private router : Router){

  }
  ngOnInit(): void {
    this.items = [
      {
          label: 'Thông tin cá nhân',
          icon: 'pi pi-info-circle'
      },
      {
          label: 'Địa điểm của bạn',
          icon: 'pi pi-map-marker'
      },
      {
          label: 'Địa điểm yêu thích',
          icon: 'pi pi-heart-fill'
      },
      {
          label: 'Quản lý',
          icon: 'pi pi-th-large',
          routerLink: '/admin/location/list',
      },
      {
          label: 'Đăng xuất',
          icon: 'pi pi-sign-out',
          command: () => {
            this.logout();
          }
      }
      
  ]
} 
  update() {
    console.log('Update');
  }

  delete() {
    console.log('Delete')
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  isLoggedIn(){
    if(this.authService.isLoggedIn()){
      return true;
    }
    return false;
  }
  getAvatar(){
    let avatar = this.authService.decodedToken().avatar;
    return avatar;
  }
  getFullname(){
    let fullname = this.authService.decodedToken().username;
    return fullname;
  }
  isAdmin(){
    if(this.authService.decodedToken().role === true){
      return true;
    }
    return false;
  }
}