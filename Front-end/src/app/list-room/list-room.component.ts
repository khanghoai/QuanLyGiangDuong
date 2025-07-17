import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../service/room.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { NumberLiteralType } from 'typescript';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-list-room',
    templateUrl: './list-room.component.html',
    styleUrl: './list-room.component.css',
    standalone: false
})
export class ListRoomComponent implements OnInit{
  public rooms : Room[][] = [[],[],[],[],[]];
  public hover : number = -1;
  public hoverJ : number = -1;
  public area : string; 

  constructor(private router : Router, private dataService : DataService, private roomService: RoomService, private route : ActivatedRoute,private cookieService : CookieService){
  }


  ngOnInit(): void {
    this.area = this.dataService.getArea();
    if(this.area != undefined){
      this.cookieService.set("area",this.dataService.getArea(),1);
    }
    else{
      this.area = this.cookieService.get("area");
    }
    this.loadRoom(this.area);
  }

  goToDetailRoom(room : Room){
    this.dataService.setRoom(room.roomName);
    this.router.navigate(['detailRoom']);
  }

  async loadRoom(area : String){
    let data : any = await this.roomService.getAllRoomByArea(area).toPromise();
    for(let i = 0;i<data.length;i++){
      let room = new Room();
      room.roomName = data[i];
      room.status = "background-color : green";
      const res : any = await this.roomService.getCapacityAndToolByRoom(room.roomName).toPromise();
      room.capacity = res[0];
      room.mic = false;
      room.screen = false;
      if(res[1][0] == "1"){
        room.mic = true;
      }
      if(res[1][1] == "2"){
        room.screen = true;
      }
      switch (room.roomName[room.roomName.lastIndexOf('.')+1]){
        case '1':
          this.rooms[4].push(room);
          break;
        case '2':
          this.rooms[3].push(room);
          break;
        case '3':
          this.rooms[2].push(room);
          break;
        case '4':
          this.rooms[1].push(room);
          break;
        case '5':
          this.rooms[0].push(room);
          break;
      }
    }
    this.rooms.forEach(room => {
      this.checkRed(room)
    });
  }

  onHover(i:number,j:number){
    this.hover = i;
    this.hoverJ = j;
   }

  async checkRed(room : Room[]){
    const date : Date = new Date();
    const day : String = date.toString().slice(0,3).toUpperCase();
    for(let i = 0;i<room.length;i++){
      let data : any = await this.roomService.getTimeAndWeekByRoomAndDay(room[i].roomName,day).toPromise();
      if(data.length != 0){
        for(let j = 0;j<data.length;j++){
          let section = data[j][0];
          let week = data[j][1];
          if(section[this.getSectionNow()-1] != "-" && week[this.dataService.getWeek()] != "_"){
            room[i].status = "background-color : red"
          }
        }
      }
    }
  }
  
  getSectionNow(){
    let date : Date = new Date();
    let minute : number = date.getHours() * 60 + date.getMinutes();
    var section;
    if(minute <= 520){ // 570 là thời gian kết thúc của tiết 2
      section = (minute-420)/50; // min = 0
    }
    else if(minute <= 690){ // 690 của tiết 5
      section = (minute-420-20)/50; // 20 là khoản nghỉ
    }
    else if(minute <= 880){// tiết 7
      section = (minute-420-20-90)/50; // 90 la khoản nghỉ
    }
    else{
      section = (minute-420-20-90-20)/50;
    }
    return Math.floor(section) + 1; //round down
  }

  checkInclude(rooms : Room[],roomName : String){
    for(let i = 0; i< rooms.length ; i++){
      if(rooms[i].roomName == roomName){
        return true;
      }
    }
    return false;
  }

  findRoom(rooms : Room[],roomName : String){
    for(let i = 0; i< rooms.length ; i++){
      if(rooms[i].roomName == roomName){
        return i;
      }
    }
    return -1;
  }
}

class Room{
  roomName : string;
  status : string;
  capacity : string;
  mic : boolean;
  screen : boolean;
}
