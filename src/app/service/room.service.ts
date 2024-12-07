import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiImportExcel = "http://localhost:8080/importExcel";
  apiTestGet = "http://localhost:8080/testGet"
  apiGetTimeStart = "http://localhost:8080/getStartTime"
  apiSetTimeStart = "http://localhost:8080/setStartTime"
  apiGetAllArea = "http://localhost:8080/getAllArea"
  apiGetAllRoomByArea = "http://localhost:8080/getAllRoomByArea"
  apiGetTimeAndWeekByRoomAndDay = "http://localhost:8080/getTimeAndWeekByRoomAndDay"
  apiGetAllRoom = "http://localhost:8080/getAllRoom"
  apiFindByRoomAndDay = "http://localhost:8080/findByRoomAndDay"
  apiSaveData = "http://localhost:8080/saveData"
  apiSaveRoom = "http://localhost:8080/saveRoom"

  constructor(private httpClient : HttpClient) { }

  importExcel(area : String, room : String, capacity : String, time : String, day : String , week:String){
    const body  = {area,room,capacity,time,day,week}
    return this.httpClient.post(this.apiImportExcel,body)
  }

  saveRoom(room : String,area : String,capacity : String){
    const body = {room,area,capacity}
    return this.httpClient.post(this.apiSaveRoom,body)
  }

  saveData(rooms : any){
    return this.httpClient.post(this.apiSaveData,rooms);
  }

  getAllArea(){
    return this.httpClient.get(this.apiGetAllArea)
  }

  getAllRoomByArea(area : String){
    const body = {area};
    return this.httpClient.post(this.apiGetAllRoomByArea,body);
  }

  getAllRoom(){
    return this.httpClient.get(this.apiGetAllRoom);
  }

  getTimeAndWeekByRoomAndDay(room : String, day : String){
    const body = {room,day}
    return this.httpClient.post(this.apiGetTimeAndWeekByRoomAndDay,body)
  }

  findByRoomAndDay(room : String, day: String){
    const body = {room,day};
    return this.httpClient.post(this.apiFindByRoomAndDay,body);
  }

  setTimeStart(timeStart : string, weekStart : string){
    const body = {timeStart,weekStart}
    return this.httpClient.post<any>(this.apiSetTimeStart,body,{
      headers : new HttpHeaders({
        'Content-type' : 'application/json'
      })
    })
  }

  getTimeStart(){
    return this.httpClient.get(this.apiGetTimeStart);
  }
}
