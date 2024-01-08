import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Category } from 'src/app/models/category';
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
  selectedCategories: any[] = [];
  filteredLocations: any[] = [];
  value: number = 4;
  first: number = 0;
  searchKeyword: string = '';
  constructor(private locationService : LocationService){
    this.getCategories();
    this.getLocations();
  }
  
  getCategories(){
    this.locationService.getCategories().subscribe(data => {
      this.categories = data.categories;
    })
  }
  getLocations(){
    this.locationService.getLocations().subscribe(res => {
      this.locations = res.locations;
    })
  }
  searchLocation(){
    this.locationService.searchLocation(this.searchKeyword).subscribe(res => {
      this.locations = res.locations;
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
