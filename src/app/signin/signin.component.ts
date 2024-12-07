import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValueChangeEvent } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.css',
    standalone: false
})
export class SigninComponent {
  public signinForm : FormGroup = new FormGroup({
    username : new FormControl(null,Validators.required),
    password : new FormControl(null,Validators.required),
    passwordAgain : new FormControl(null,Validators.required)
  })
  click :boolean = false;
  constructor(private router : Router, private loginService : LoginService){

  }

  onSubmit(){
    this.loginService.register(this.signinForm.get("username")?.value,this.signinForm.get("password")?.value).subscribe(
      () => {
        this.click = true;
      },
      error => {
        console.error('Đăng ký thất bại', error);
      }
    );
  }

  goToMainPage(){
    this.router.navigate(['mainPage']);
  }
}
