import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit{
  addLocationForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addLocationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      images: [[]]  // Sử dụng mảng để lưu trữ nhiều hình ảnh
    });
  }

  onSubmit() {
    if (this.addLocationForm.valid) {
      // Xử lý khi form hợp lệ
      console.log(this.addLocationForm.value);
    }
  }
}
