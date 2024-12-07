import { ParseSourceFile } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent {
  public loginForm : FormGroup = new FormGroup({
    username : new FormControl(null,Validators.required),
    password : new FormControl(null,Validators.required)
  })
  constructor(private router : Router, private loginService : LoginService){};

  onSubmit(){
    this.loginService.login(this.loginForm.get("username")?.value, this.loginForm.get("password")?.value).subscribe(
      response => {
        if(response.userType == "3"){
          this.router.navigate(['adminPage']);
        }
        else{
          this.router.navigate(['mainPage']);
        }
      },
      error => {
        console.error('Đăng nhập thất bại:', error);
      }
    );
  }

  goToSignin(){
    this.router.navigate(['signin']);
  }
}
