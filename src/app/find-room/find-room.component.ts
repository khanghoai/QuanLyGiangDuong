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
  constructor(private dataService : DataService,private roomService : RoomService){}

  ngOnInit(): void {
    this.loadRoom();
  }

  loadRoom(){
    this.roomService.getAllRoom().subscribe((res:any)=>{
      for(let i = 0; i<res.length;i++){
        this.roomService.findByRoomAndDay(res[i],this.dataService.dayChose).subscribe((response : any) =>{
          if(this.checkRoom(response)){
            this.rooms.push(new Room(response[0].area,res[i],response[0].capacity, this.dataService.dayChose, this.covertSectionToSave(this.dataService.timeStartChose, this.dataService.timeChose), this.convertWeekToSave(this.dataService.weekChose)));
            this.noRoom=false;
          }
        })
      }
    })
  }

  registerRoom(room : Room){
    console.log(room);
    this.roomService.importExcel(room.area,room.roomName,room.capacity,room.section,room.day,room.week).subscribe((res :any) =>{
      console.log(res);
    });
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
      if(!this.checkSection(res[i],this.dataService.timeStartChose,this.dataService.timeChose)){
        console.log(res[i].room,res[i].week,res[i].week == null)
        if(res[i].week == null || res[i].week[+this.dataService.weekChose-2] == "_"){
          return true;
        }
        return false;
      }
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
