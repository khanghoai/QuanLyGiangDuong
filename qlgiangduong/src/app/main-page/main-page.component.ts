import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../service/room.service';
import { DataService } from '../service/data.service';
import { lastValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    standalone: false
})
export class MainPageComponent implements OnInit {
  public areas : string[] = [];

  constructor(private router : Router, private roomService : RoomService, private dataService : DataService, private cookieService : CookieService){
  }

  ngOnInit(): void {
    // this.getAllArea();
    // this.getWeekNow();
  }

  goToListRoom(area : string){
    this.dataService.setArea(area);
    this.router.navigate(['listRoom']);
  }

  getAllArea(){
    this.roomService.getAllArea().subscribe((res:any)=>{
      this.areas = res;
    })
  }

  // getWeekNow(){
  //   let dateStart : Date = new Date();
  //   let date : Date = new Date();
  //   this.roomService.getTimeStart().subscribe((res : any)=>{
  //     dateStart = new Date(this.covertFormatDate(res[0].timeStart));
  //     const dateB = (date.getTime() - dateStart.getTime())/(1000 * 3600 * 24) - ((date.getTime() - dateStart.getTime())%(1000 * 3600 * 24))/(1000 * 3600 * 24)
  //     const week : number = dateB/7 - dateB%7/7
  //     // const weekStart : number = res[0].weekStart;
  //     this.dataService.setWeek(week);
  //   })
  // }

  covertFormatDate(date : String){
    return `${date.slice(3,5)}/${date.slice(0,2)}/${date.slice(6)}`
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToRegisterRoom(){
    this.router.navigate(['registerRoom']);
  }

  goToUpdateAccount(){
    this.router.navigate(['updateAccount'])
  }
}
