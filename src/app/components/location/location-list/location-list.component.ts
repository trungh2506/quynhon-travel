import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
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
export class LocationListComponent implements OnInit{
  categories: any[] = [];
  locations: any[] = [];
  selectedCategories: any[] = [];
  filteredLocations: any[] = [];
  value: number = 4;
  first: number = 0;
  searchKeyword: string = '';

  //load more
  displayedLocations: any[] = [];
  locationPerPage: number = 4;

  constructor(private locationService : LocationService, private messageService : MessageService){
    
  }
  ngOnInit(): void {
    this.getCategories();
    this.getLocations();
    this.showMoreItems();
  }
  
  getCategories(){
    this.locationService.getCategories().subscribe(data => {
      this.categories = data.categories;
    })
  }
  getLocations(){
    this.locationService.getLocations().subscribe(res => {
      this.locations = res.locations;
      for(let i = 0; i < 8; i++){
        this.displayedLocations[i] = this.locations[i];
      }
    })
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
  //Load more button function
  showMoreItems() {
    const remainingItems = this.locations.slice(this.displayedLocations.length, this.displayedLocations.length + this.locationPerPage);
    this.displayedLocations = [...this.displayedLocations, ...remainingItems];
  }

  //filter
  filterLocations(category : any){
    const index = this.selectedCategories.indexOf(category);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }

    if (this.selectedCategories.length > 0) {
      this.filteredLocations = this.locations.filter(location =>
        location.categories.some((locationCategory :any) =>
          this.selectedCategories.some((selectedCategory : any) =>
            locationCategory._id === selectedCategory._id
          )
        )
      );
      this.locations = this.filteredLocations
      this.displayedLocations = this.locations;
      this.messageService.add({ severity: 'info', summary: `Kết quả cho ${this.selectedCategories[0].name}`, detail: `${this.filteredLocations.length.toString()}` });
    } else {
      this.getLocations();
    }
  }
}
