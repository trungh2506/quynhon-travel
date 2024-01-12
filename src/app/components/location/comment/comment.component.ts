import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessageService } from 'primeng/api';
import { Comment } from 'src/app/models/comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  comment: any
  commentForm: FormGroup;
  location_id: any
  comments: any[] = [];
  value: number = 3;
  first: number = 0;
  constructor(private fb: FormBuilder, 
    private commentService : CommentService, 
    private route: ActivatedRoute,
    private authService : AuthService,
    private messageService : MessageService) {
    this.commentForm = this.fb.group({
      message: ['', Validators.required],
      rating: [, Validators.required],
    });
  }

  ngOnInit(): void {
    this.location_id = this.route.snapshot.paramMap.get('id');
    this.getCommentByLocationId(this.location_id);
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.comment = {};

      this.comment.user_id = this.authService.decodedToken().user_id;
      this.comment.location_id = this.location_id;
      this.comment.message = this.commentForm.get('message')?.value;
      this.comment.rating = this.commentForm.get('rating')?.value;
      this.commentService.postComment(this.comment).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cảm ơn bạn đã đánh giá!' });
      })
    }
  }
  getCommentByLocationId(location_id: string){
    this.commentService.getCommentByLocationId(location_id).subscribe(res => {
      this.comments = res.comments.reverse();
    })
  }
  isLoggedIn(){
    if(this.authService.isLoggedIn()){
      return true;
    }
    return false;
  }
}
