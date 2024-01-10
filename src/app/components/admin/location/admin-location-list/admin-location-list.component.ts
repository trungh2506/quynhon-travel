import { Component, OnInit } from '@angular/core';
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
  constructor(private locationService : LocationService) {}

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
}
