import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService : AuthService, 
    private router : Router,
    private messageService : MessageService
    ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
          .subscribe(data => {
            const token = data.access_token;
            this.authService.saveToken(token);
            // alert('Đăng nhập thành công!!!');
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công!' });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
            
          })
      
    }else {
      alert('Đăng nhập thất bại!')
    }
  }
}
