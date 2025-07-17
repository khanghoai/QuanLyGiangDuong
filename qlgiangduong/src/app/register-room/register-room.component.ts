import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { RoomService } from '../service/room.service';
import { MatSingleDateSelectionModel } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-room',
    templateUrl: './register-room.component.html',
    styleUrl: './register-room.component.css',
    standalone: false
})
export class RegisterRoomComponent {
  days : string[] = [];
  months : string[] = [];
  Times : String[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"]
  dayChose : string;
  timeStartChose : String;
  timeChose : String;
  weekChose : string;
  micCheck : boolean = false;
  screenCheck : boolean = false;
  public formGroup : FormGroup = new FormGroup({
    capacity : new FormControl(null, Validators.required), 
  })

  constructor(private router : Router,private dataService : DataService,private roomService : RoomService){
    for(let i = 1;i<32;i++){
      this.days.push(i+"");
    }
    for(let i =1;i<13;i++){
      this.months.push(i+"");
    }
  }

  updateMic(){
    this.micCheck = !this.micCheck;
  }

  updateScreen(){
    this.screenCheck = !this.screenCheck;
  }
  
  // async goToFindRoom(){
  //   this.dataService.timeChose = this.timeChose;
  //   this.dataService.timeStartChose = this.timeStartChose;
  //   await this.getWeekAndDayByDateAndMonth(this.dayChose,this.weekChose)
  //   this.dataService.capacityChose = this.formGroup.get("capacity")?.value;
  //   this.dataService.micChose = this.micCheck;
  //   this.dataService.screenChose = this.screenCheck;
  //   this.router.navigate(['findRoom']);
  // }

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

  // async getWeekAndDayByDateAndMonth(date : string, month : string){
  //   let dateStart : Date = new Date();
  //   let dates : Date = new Date();
  //   dates.setDate(+date);
  //   dates.setMonth(+month-1);
  //   const data : any = await this.roomService.getTimeStart().toPromise();
  //   dateStart = new Date(this.covertFormatDate(data[0].timeStart));
  //   const dateB = (dates.getTime() - dateStart.getTime())/(1000 * 3600 * 24) - ((dates.getTime() - dateStart.getTime())%(1000 * 3600 * 24))/(1000 * 3600 * 24)
  //   const week : number = dateB/7 - dateB%7/7
  //   this.dataService.weekChose = (week + (+data[0].weekStart))+"";
  //   this.dataService.dayChose = dates.toString().slice(0,3).toUpperCase();
  // }

  covertFormatDate(date : String){
    return `${date.slice(3,5)}/${date.slice(0,2)}/${date.slice(6)}`
  }
}
