import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reply-comment',
  templateUrl: './reply-comment.component.html',
  styleUrls: ['./reply-comment.component.scss']
})
export class ReplyCommentComponent {
  @Input() parentComment: any;
  replyText: string = '';
  submitReply(event: any) {
    // Handle submit logic here
    console.log('Reply Text:', this.replyText);

    // You can also access the event object if needed
    console.log('Button Clicked:', event);
  }
}
