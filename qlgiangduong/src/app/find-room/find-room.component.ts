import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../service/room.service';
import { DataService } from '../service/data.service';
import { nodeModuleNameResolver } from 'typescript';

@Component({
    selector: 'app-find-room',
    templateUrl: './find-room.component.html',
    styleUrl: './find-room.component.css',
    standalone: false
})
export class FindRoomComponent implements OnInit{
  public rooms : Room[] = [];
  public noRoom : boolean = true;
  public A1 : Room[] = [];
  public A1Check : boolean = false;
  public A2 : Room[] = [];
  public A2Check : boolean = false;
  public A3 : Room[] = [];
  public A3Check : boolean = false;
  public A4 : Room[] = [];
  public A4Check : boolean = false;
  public A5 : Room[] = [];
  public A5Check : boolean = false;
  public A6 : Room[] = [];
  public A6Check : boolean = false;
  public A7 : Room[] = [];
  public A7Check : boolean = false;
  public A8 : Room[] = [];
  public A8Check : boolean = false;
  public IschoseArea : boolean = true;
  public room : Room;
  public registerCheck : boolean = false;
  constructor(private dataService : DataService,private roomService : RoomService){}

  ngOnInit(): void {
    this.loadRoom();
  }

  async loadRoom(){
    const data : any = await this.roomService.getAllRoom().toPromise();
    for(let i = 0; i<data.length;i++){
      // const res = await this.roomService.findByRoomAndDay(data[i],this.dataService.dayChose).toPromise();
      const res : any = await this.roomService.findByRoomAndDay(data[i],"TUE").toPromise();
      if(res[0] != undefined && this.checkRoom(res)){
        this.rooms.push(new Room(res[0].area,data[i],res[0].capacity, this.dataService.dayChose, this.covertSectionToSave(this.dataService.timeStartChose, this.dataService.timeChose), this.convertWeekToSave(this.dataService.weekChose)));
        this.noRoom=false;
      }
    }
    this.rooms.forEach(room => {
      switch(room.getRoomName().slice(0,2)){
        case "A1":
          this.A1.push(room);
          break;
        case "A2":
          this.A2.push(room);
          break;
        case "A3":
          this.A3.push(room);
          break;
        case "A4":
          this.A4.push(room);
          break;
        case "A5":
          this.A5.push(room);
          break;
        case "A6":
          this.A6.push(room);
          break;
        case "A7":
          this.A7.push(room);
          break;
        case "A8":
          this.A8.push(room);
          break;
      }
    });
  }

  submitRegisterRoom(){
    this.roomService.importExcel(this.room.area,this.room.roomName,this.room.capacity,this.room.section,this.room.day,this.room.week).subscribe((res :any) =>{
      
    });
  }

  registerRoom(room : Room){
    this.room = room;
    this.registerCheck = true;
  }

  denyRegisterRoom(){
    this.registerCheck = false;
  }

  choseArea(area : string){
    switch(area){
      case "A1":
        this.A1Check = true
        this.IschoseArea = false;
        break;
      case "A2":
        this.A2Check = true
        this.IschoseArea = false;
        break;
      case "A3":
        this.A3Check = true
        this.IschoseArea = false;
        break;
      case "A4":
        this.A4Check = true
        this.IschoseArea = false;
        break;
      case "A5":
        this.A5Check = true
        this.IschoseArea = false;
        break;
      case "A6":
        this.A6Check = true
        this.IschoseArea = false;
        break;
      case "A7":
        this.A7Check = true
        this.IschoseArea = false;
        break;
      case "A8":
        this.A8Check = true
        this.IschoseArea = false;
        break;
    }
  }

  choseAreaAgian(){
    this.A1Check = false;
    this.A2Check = false;
    this.A3Check = false;
    this.A4Check = false;
    this.A5Check = false;
    this.A6Check = false;
    this.A7Check = false;
    this.A8Check = false;
    this.IschoseArea = true;
  }

  convertWeekToSave(weekStart : String){
    var value = [] 
    for(let i = 0;i<16;i++){// có 16 tiết học
      value[i] = "_"
    }
    value[+weekStart-2]= weekStart;
    return value.join('');
  }

  covertSectionToSave(sectionStart : String, sectionQuantity : String){
    var value = [] 
    for(let i = 0;i<16;i++){// có 16 tiết học
      value[i] = "-"
    }
    for(let i = 0 ;i < +sectionQuantity; i++){
      value[+sectionStart-1+i] = +sectionStart+i
    }
    return value.join('');
  }

  checkRoom(res : any){
    for(let i = 0; i<res.length;i++){
      // if(!this.checkSection(res[i],this.dataService.timeStartChose,this.dataService.timeChose)){
      if(!this.checkSection(res[i],"6","1")){
        // if(res[i].week == null || res[i].week[+"this.dataService.weekChose"-2] == "_"){
        if(res[i].week == null || res[i].week[+"16"-2] == "_"){
          if(+res[i].capacity > +this.dataService.capacityChose){
            // res[i].tool Xample : '12', '__'
            if(this.checkMic(res[i].tool[0])){
              if(this.checkScreen(res[i].tool[1])){
                return true;
              }
            }
          }
        }
        return false;
      }
    }
    return false;
  }

  checkMic(data : string){
    if(this.dataService.micChose){
      if(data == "1"){
        return true;
      }
      return false;
    }
    return true;
  }
  checkScreen(data : string){
    if(this.dataService.screenChose){
      if(data == "2"){
        return true;
      }
      return false;
    }
    return true;
  }

  checkSection(data : any, sectionStart : String, sectionQuantity : String){
    for(let i = 0; i<+sectionQuantity;i++){
      if(data.time[+sectionStart-1+i] != "-"){
        return false;
      }
    }
    return true;
  }
}

class Room{
  public area : String;
  public roomName : String;
  public capacity : String;
  public day : String;
  public section : String;
  public week : String;

  constructor(area : String,roomName :String, capacity : String, day :String,section : String, week : String){
    this.area = area;
    this.roomName = roomName;
    this.capacity = capacity;
    this.day = day;
    this.section = section;
    this.week = week;
  }

  public getRoomName(){
    return this.roomName;
  }

  public getDay(){
    return this.day;
  }

  public getSection(){
    return this.section;
  }

  public getWeek(){
    return this.week;
  }
}
