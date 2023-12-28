import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit{
  comments = [
    { id: 1, author: 'User 1', text: 'Comment 1', replies: [] },
    { id: 2, author: 'User 2', text: 'Comment 2', replies: [] },
    // ... add more comments
  ];
  selectedComment: any;

  ngOnInit(): void {

  }
  onReplyClicked(comment: any) {
    this.selectedComment = comment;
  }
}
