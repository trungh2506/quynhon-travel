import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  cities!: City[];

  selectedCities!: City[];
  addLocationForm!: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
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

  onSubmit() {
    if (this.addLocationForm.valid) {
      // Xử lý khi form hợp lệ
      console.log(this.addLocationForm.value);
    }
  }
}
