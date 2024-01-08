import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { LocationDetailComponent } from './components/location/location-detail/location-detail.component';
import { FavoriteListComponent } from './components/user/favorite-list/favorite-list.component';
import { AddLocationComponent } from './components/location/add-location/add-location.component';
import { GuardService } from './services/guard.service';

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
    path: '**', redirectTo: 'home'
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
