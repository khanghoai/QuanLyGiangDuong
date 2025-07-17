import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-account',
  standalone: false,
  
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css'
})
export class UpdateAccountComponent {

  student : boolean = false;
  teacher : boolean = false;
  form : boolean = false;
  studentP : boolean = false;
  teacherP : boolean = false;
  update : boolean = true;

  studentForm : FormGroup = new FormGroup({
    studentName : new FormControl(null,Validators.required)
  })

  teacherForm : FormGroup = new FormGroup({
    teacherName : new FormControl(null,Validators.required),
  })

  goToStudent(){
    this.update = false;
    this.form = true;
    this.student = true;
  }

  goToTeacher(){
    this.update = false;
    this.form = true;
    this.teacher = true;
  }

  Comfirm(){
    if(this.teacher){
      this.teacherP = true;
    }
    else{
      this.studentP = true;
    }
  }
}
