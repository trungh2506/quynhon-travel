import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';

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
  public locationsSubject = new BehaviorSubject<any[]>([]);
  locations$: Observable<any[]> = this.locationsSubject.asObservable();

  // danh sách địa điểm yêu thích của người dùng
  private favouritesSubject = new BehaviorSubject<any[]>([]);
  favourites$: Observable<any[]> = this.favouritesSubject.asObservable();

  categories: any[] = [];
  selectedCategories: Category[] = [];
  filteredLocations: any[] = [];
  value: number = 4;
  first: number = 0;
  searchKeyword: string = '';

  //load more
  displayedLocations: any[] = [];
  locationPerPage: number = 4;

  constructor(private locationService : LocationService, 
    private messageService : MessageService, 
    private router: Router,
    private authService : AuthService, 
    private userService : UserService){
    
  }
  ngOnInit(): void {
    this.getCategories();
    this.getLocations();
    this.getFavouriteList();
    this.showMoreItems();
  }
  
  getCategories(){
    this.locationService.getCategories().subscribe(data => {
      this.categories = data.categories;
    })
  }
  getLocations(){
    //Admin sẽ thấy những địa điểm chưa duyệt
    if(this.isAdmin()){
      this.locationService.getAdminLocations().subscribe(res => {
        this.locationsSubject.next(res.locations);
        for(let i = 0; i < 8; i++){
          this.displayedLocations[i] = this.locationsSubject.getValue()[i];
        }
      })
    }else {
      this.locationService.getLocations().subscribe(res => {
        this.locationsSubject.next(res.locations);
        for(let i = 0; i < 8; i++){
          this.displayedLocations[i] = this.locationsSubject.getValue()[i];
        }
      })
    }
    
  }
  searchLocation(){
    this.locationService.searchLocation(this.searchKeyword).subscribe(res => {
      this.locationsSubject.next(res.locations);
      this.displayedLocations = this.locationsSubject.getValue();
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
    const remainingItems = this.locationsSubject.getValue().slice(this.displayedLocations.length, this.displayedLocations.length + this.locationPerPage);
    this.displayedLocations = [...this.displayedLocations, ...remainingItems];
  }


  hasSelectedCategories = (location: any, selectedCategories: any[]): boolean => {
    return location.categories.some((locationCategory:any) => selectedCategories.some(selectedCategory => locationCategory._id === selectedCategory._id));
  };

  //filter
  filterLocations(category : any){
    const index = this.selectedCategories.indexOf(category);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    if (this.selectedCategories.length >= 2){
      this.messageService.add({
        severity: 'warn',
        summary: `Chỉ được chọn 1`
      });
      return
    }
    if (this.selectedCategories.length > 0) {
      this.filteredLocations = this.locationsSubject.getValue().filter(location =>
      this.hasSelectedCategories(location, this.selectedCategories)
    );


      this.locationsSubject.next(this.filteredLocations);
      this.displayedLocations = this.locationsSubject.getValue();
      this.messageService.add({
        severity: 'info',
        summary: `Kết quả cho ${this.selectedCategories[0].name}`,
        detail: `${this.filteredLocations.length.toString()}`
      });
    } else {
      this.getLocations();
    }
  }
  authorProfile(event: Event, user_id: string) {
    // Ngăn chặn sự kiện click lan ra và chuyển hướng đến routerLink của thẻ img
    event.stopPropagation();
  
    // Xử lý sự kiện click trên hình ảnh của tác giả
    this.router.navigate(['/user', user_id]);
  }
  locationDetail(event: Event, location_id: string){
    event.stopPropagation();
    this.router.navigate(['/location', location_id]);
  }

  //favourite list
  addOrRemoveFavouriteLocation(event: any, location_id : any){
    event.stopPropagation();
    if(!this.authService.isLoggedIn()){
      this.messageService.add({ severity: 'warn', summary: `Cảnh báo`, detail: `Bạn chưa đăng nhập, vui lòng đăng nhập !` });
      return;
    }else {
      const user_id = this.authService.decodedToken().user_id;
      this.locationService.addOrRemoveFavouriteLocation(user_id, location_id).subscribe(res => {
        this.getFavouriteList();
        this.messageService.add({ severity: 'success', summary: `Thành công`, detail: `${res.status}` });
      })
    }
  }
  // lấy danh sách địa điểm yêu thích người dùng
  getFavouriteList(){
    if(this.authService.isLoggedIn()){
      this.userService.getUserInfoById(this.authService.decodedToken().user_id).subscribe(res => {
        this.favouritesSubject.next(res.favourite_locations);
        console.log(this.favouritesSubject.getValue());
      })
    }
    
  }
  // kiểm tra địa điểm đã được người dùng thêm vào yêu thích hay chưa
  isFavored(location_id: any){
    const favourites = this.favouritesSubject.getValue();
    if(favourites.length == 0){
      return false;
    }else {
      for(const location of favourites){
        const isExits = favourites.find(loc => loc.location_id._id === location_id)
        if(isExits)
          return true;
        else return false;
      }
    }
    return false;
  }
  isAdmin(){
    if(this.authService.isLoggedIn()){
      if(this.authService.decodedToken().role === true){
        return true;
      }
    }
    return false;
  }

}
