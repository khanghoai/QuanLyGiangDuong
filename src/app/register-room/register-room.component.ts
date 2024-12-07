import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
    selector: 'app-register-room',
    templateUrl: './register-room.component.html',
    styleUrl: './register-room.component.css',
    standalone: false
})
export class RegisterRoomComponent {
  Days : String[] = ["Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy","Chủ nhật",]
  Times : String[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]
  Weeks : String[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]
  dayChose : String;
  timeStartChose : String;
  timeChose : String;
  weekChose : String;

  constructor(private router : Router,private dataService : DataService){}
  
  goToFindRoom(){
    this.dataService.dayChose = this.dayChose;
    this.dataService.timeStartChose = this.timeStartChose;
    this.dataService.timeChose = this.timeChose;
    this.dataService.weekChose = this.weekChose;

    this.router.navigate(['findRoom']);
  }

  convertToDay(day : String){
    switch(day){
      case "Thứ hai":
        return "MON";
      case "Thứ ba":
        return "TUE";
      case "Thứ tư":
        return "WED";
      case "Thứ năm":
        return "THU";
      case "Thứ sáu":
        return "FRI";
      case "Thứ bảy":
        return "SAT";
    }
    return "SUN";
  }
}
