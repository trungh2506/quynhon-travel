import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.scss']
})
export class AdminCategoryListComponent implements OnInit{
  categoryForm: FormGroup;
  categories: any[] = [];
  visible: boolean = false;
  constructor(private fb: FormBuilder, 
    private locationService : LocationService,
    private messageService : MessageService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
     this.getCategories();
  }
  onSubmit() {
    if (this.categoryForm.valid) {
      this.locationService.addCategory(this.categoryForm.value).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: `Đã thêm: "${this.categoryForm.get('name')?.value}"  thành công!` });
      })
      
    }
  }
  getCategories(){
    this.locationService.getAdminCategories().subscribe(res => {
      this.categories = res.categories;
    })
  }
  deleteCategory(category_id: any){
    this.locationService.deleteCategory(category_id).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: `${res.msg}` });
    })
  }
  showDialog() {
    this.visible = true;
}

}
