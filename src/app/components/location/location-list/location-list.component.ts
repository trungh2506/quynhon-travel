import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LocationService } from 'src/app/services/location.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
  categories: any[] = [];
  locations: any[] = [];
  value: number = 4;
  first: number = 0;
  constructor(private locationService : LocationService){
    this.getCategories();
  }
  
  getCategories(){
    this.locationService.getCategories().subscribe(data => {
      this.categories = data.categories;
    })
  }
}
