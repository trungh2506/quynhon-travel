import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @Input() label: string | undefined;
  @Input() disabled: boolean = false;
  @Input() clicked: boolean = false;

  isClicked(){
    this.clicked = !this.clicked;
  }
}
