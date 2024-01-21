import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-admin-location-list',
  templateUrl: './admin-location-list.component.html',
  styleUrls: ['./admin-location-list.component.scss']
})
export class AdminLocationListComponent implements OnInit{
  selectedLocation: any;
  locations: any[] = [];
  searchKeyword: string = ''
  displayedLocations: any[] = [];
  constructor(private locationService : LocationService, 
    private confirmationService : ConfirmationService, 
    private router : Router, 
    private messageService : MessageService) {}

  ngOnInit() {
     this.getLocations();
  }
  getLocations(){
    this.locationService.getAdminLocations().subscribe(res => {
      this.locations = res.locations;
      this.displayedLocations = this.locations;
    })
  }
  getSeverity(role: boolean) {
    if(role){
      return 'success';
    }else{
      return 'warning';
    }
  }
  getStatusInfo(role: boolean){
    if(role){
      return 'Đã xác minh';
    }else{
      return 'Chưa xác minh';
    }
  }
  searchLocation(){
    this.locationService.searchLocation(this.searchKeyword).subscribe(res => {
      this.locations = res.locations;
      this.displayedLocations = this.locations;
    })
  }
  onSearchInputChange() {
    if (this.searchKeyword.trim() !== '') {
      this.searchLocation();
    } else {
      this.getLocations();
    }
  }
  deleteLocation(event: Event, location_id: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có muốn xóa địa điểm này?',
        header: 'Xóa địa điểm',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
            this.locationService.deleteLocation(location_id).subscribe(res => {
              this.router.navigate(['/']);
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Thành công', detail: `${res.msg}` });
              }, 100);
            })
            
        },
    });
}
}
