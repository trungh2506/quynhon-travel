import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: any;
  @Output() replyClicked = new EventEmitter<any>();

  onReplyClick() {
    this.replyClicked.emit(this.comment);
  }
}
