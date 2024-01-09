import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit{
  comments: any[] = [];
  selectedComment: any;
  location_id: any;
  location!: any;
  constructor(private route: ActivatedRoute, 
    private locationService : LocationService, 
    private commentService : CommentService){
    
  }
  ngOnInit(): void {
    this.location_id = this.route.snapshot.paramMap.get('id');
    this.getLocationById(this.location_id);
  }
  getLocationById(location_id: string){
    this.locationService.getLocationById(location_id).subscribe(res => {
      this.location = res;
    })
  }
  
}
