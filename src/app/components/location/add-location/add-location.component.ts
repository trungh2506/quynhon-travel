import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadEvent } from 'primeng/fileupload';
import { LocationService } from 'src/app/services/location.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit{
  readonly apiUrlUpload = 'http://localhost:4000/uploads/locations';
  categories: any[] = [];
  selectedCategories!: any[];
  addLocationForm!: FormGroup;
  selectedImages: any[] = [];
  sanitizer: any;
  constructor(private fb: FormBuilder, private locationService : LocationService) { 
    this.getCategories();
  }

  ngOnInit(): void {
    this.addLocationForm = this.fb.group({
      name: ['', Validators.required],
      categories: [[]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      images: [[]]  // Sử dụng mảng để lưu trữ nhiều hình ảnh
    });
  }
  getCategories(){
    this.locationService.getCategories().subscribe(data => {
      this.categories = data.categories;
    })
  }
  onSubmit() {
    if (this.addLocationForm.valid) {
      const formData = new FormData();

    // Thêm hình ảnh vào formData
    for(let img of this.selectedImages){
      formData.append('images', img)
    }

    // Thêm các trường dữ liệu khác nếu cần
    formData.append('name', this.addLocationForm.get('name')?.value);
    formData.append('description', this.addLocationForm.get('description')?.value);
    formData.append('address', this.addLocationForm.get('address')?.value);

    const categories = this.addLocationForm.get('categories')?.value;
    const categoryIds = categories.map((category: any) => category._id);
    formData.append('categories', JSON.stringify(categoryIds));


    this.locationService.addLocation(formData).subscribe(response => {
      console.log('Upload successful:', response);
      // Thực hiện các xử lý sau khi tải lên thành công
    });
      }
    }
  onImageSelect(event: any) {
    if(event.target.files.length > 0){
      this.selectedImages = event.target.files;
    }
  }
  getImageUrl(image: File): string {
    return URL.createObjectURL(image);
  }
}
