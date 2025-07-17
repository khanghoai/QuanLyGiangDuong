import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private area : string;
  private room : String;
  private data : any;
  private week : number;
  dayChose : string;
  timeStartChose : String;
  timeChose : String;
  weekChose : string;
  capacityChose : string;
  micChose : boolean;
  screenChose : boolean;

  constructor() { }

  setRoom(room : String){
    this.room = room;
  }

  getRoom(){
    return this.room;
  }

  setWeek(week : number){
    this.week = week;
  }

  getWeek(){
    return this.week;
  }

  setArea(area : string){
    this.area = area;
  }

  getArea(){
    return this.area;
  }

  setData(data : any){
    this.data = data;
  }

  getData(){
    return this.data;
  }
}
