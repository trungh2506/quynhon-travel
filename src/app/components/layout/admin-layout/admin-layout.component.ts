import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  items = [
    { 
      label: 'Dashboard', 
      icon: 'pi pi-fw pi-home', 
      routerLink: '/admin/dashboard' },
    { 
      label: 'Người Dùng', 
      icon: 'pi pi-fw pi-user', 
      items: [
        {
          label: 'Danh sách người dùng',
          icon: 'pi pi-users',
          routerLink: '/admin/user/list',
        },
        {
          label: 'Thêm người dùng mới',
          icon: 'pi pi-user-plus'
        },
      ]
    },
    { 
      label: 'Địa Điểm', 
      icon: 'pi pi-fw pi-map', 
      items: [
        {
          label: 'Danh sách địa điểm',
          icon: 'pi pi-map-marker',
          routerLink: '/admin/location/list',
          items: [
            {
              label: 'Chưa xác minh',
              icon: 'pi pi-eye'
            },
            {
              label: 'Đã xác minh',
              icon: 'pi pi-verified'
            }
          ]
        },
        {
          label: 'Thêm địa điểm mới',
          icon: 'pi pi-fw pi-map',
          routerLink: '/add',
        }
      ]
    },
    {
      label: 'Loại địa điểm',
      icon: 'pi pi-tag',
      items: [
        {
          label: 'Danh sách loại địa điểm',
          icon: 'pi pi-tags',
          routerLink: '/admin/category/list',
        }
      ]
    }

  ];
}
