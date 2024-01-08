import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  commentForm: FormGroup;
  location_id: any
  comments: any[] = [];
  value: number = 4;
  first: number = 0;
  constructor(private fb: FormBuilder, private commentService : CommentService, private route: ActivatedRoute) {
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

      const newComment = { text: this.commentForm.value.comment };
      this.comments.push(newComment);

      // Thực hiện lưu trữ bình luận vào cơ sở dữ liệu hoặc gửi đến backend nếu cần
      
      // Sau khi gửi, bạn có thể xóa nội dung trong form
      this.commentForm.reset();
    }
  }
  getCommentByLocationId(location_id: string){
    this.commentService.getCommentByLocationId(location_id).subscribe(res => {
      this.comments = res.comments;
    })
  }
}
