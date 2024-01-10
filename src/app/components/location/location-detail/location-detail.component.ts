import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private commentService : CommentService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private authService : AuthService){
    
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
  confirm1(event: Event) {
      this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Bạn có chắc muốn xác minh địa điểm này?',
          header: 'Xác minh địa điểm',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectButtonStyleClass:"p-button-text",
          accept: () => {
              this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xác minh thành công!' });
          }
      });
  }

  confirm2(event: Event) {
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
              this.messageService.add({ severity: 'info', summary: 'Thành công', detail: 'Xóa địa điểm thành công!' });
          },
      });
  }
  isAdmin(){
    if(this.authService.decodedToken().role === true){
      return true;
    }
    return false;
  }
}
