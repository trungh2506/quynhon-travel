import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { LocationDetailComponent } from './components/location/location-detail/location-detail.component';
import { FavoriteListComponent } from './components/user/favorite-list/favorite-list.component';
import { AddLocationComponent } from './components/location/add-location/add-location.component';
import { GuardService } from './services/guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { AdminUserListComponent } from './components/admin/user/admin-user-list/admin-user-list.component';
import { AdminLocationListComponent } from './components/admin/location/admin-location-list/admin-location-list.component';
import { AdminDashboardComponent } from './components/admin/dashboard/admin-dashboard/admin-dashboard.component';
import { AdminCategoryListComponent } from './components/admin/category/admin-category-list/admin-category-list.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: LocationListComponent
  },
  {
    path: 'add', canActivate: [GuardService], component: AddLocationComponent
  },
  {
    path: 'favorites',  component: FavoriteListComponent
  },
  {
    path: 'location/:id', component: LocationDetailComponent
  },
  {
    path: 'admin',
    canActivate: [GuardService, AdminGuardService],
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            component: AdminUserListComponent
          }
        ]
      },
      {
        path: 'location',
        children: [
          {
            path: 'list',
            component: AdminLocationListComponent
          }
        ]
      },
      {
        path: 'category',
        children: [
          {
            path: 'list',
            component: AdminCategoryListComponent
          }

        ]
      }
    ]
  },
  {
    path: '**', redirectTo: 'home'
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
