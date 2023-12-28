import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;
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
          label: 'Đăng xuất',
          icon: 'pi pi-sign-out'
      }
      
  ]
} 
update() {
  console.log('Update');
}

delete() {
  console.log('Delete')
}
}