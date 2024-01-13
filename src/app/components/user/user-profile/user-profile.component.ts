import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationListComponent } from '../../location/location-list/location-list.component';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  locations: any[] = [];
  favourite_locations: any[] = [];
  user_id: any;
  user!:any;
  constructor(private route: ActivatedRoute, 
    private userService : UserService, 
    private authService : AuthService,
    private messageService : MessageService,
    private locationService : LocationService){

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user_id = params['id'];
      this.getUserInfo(this.user_id);
    });
  }
  //Danh sách địa điểm user
  getUserInfo(user_id: any){
    this.userService.getUserInfoById(user_id).subscribe(res => {
      this.locations = res.locations;
      this.favourite_locations = res.favourite_locations;
      this.user = res.info;
    })
  }
  checkUserProfile(user_id: any){
    if(this.authService.checkUserProfile(user_id)){
      return true;
    }
    return false;
  }
  addOrRemoveFavouriteLocation(event: any, location_id : any){
    event.stopPropagation();
    if(!this.authService.isLoggedIn()){
      this.messageService.add({ severity: 'warn', summary: `Cảnh báo`, detail: `Bạn chưa đăng nhập, vui lòng đăng nhập !` });
      return;
    }else {
      const user_id = this.authService.decodedToken().user_id;
      this.locationService.addOrRemoveFavouriteLocation(user_id, location_id).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: `Cảnh báo`, detail: `${res.status}` });
      })
    }
  }
}
