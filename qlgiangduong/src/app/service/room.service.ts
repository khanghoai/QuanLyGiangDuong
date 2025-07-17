import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiSaveTKB = "http://localhost:8080/saveTKB";
  apiTestGet = "http://localhost:8080/testGet"
  apiSetTimeStart = "http://localhost:8080/setStartTime"
  apiGetAllArea = "http://localhost:8080/getAllArea"
  apiGetAllRoomByArea = "http://localhost:8080/getAllRoomByArea"
  apiGetTimeAndWeekByRoomAndDay = "http://localhost:8080/getTimeAndWeekByRoomAndDay"
  apiGetAllRoom = "http://localhost:8080/getAllRoom"
  apiFindByRoomAndDay = "http://localhost:8080/findByRoomAndDay"
  apiSaveData = "http://localhost:8080/saveTKB"
  apiSaveRoom = "http://localhost:8080/saveRoom"
  apiGetCapacityAndToolByRoom = "http://localhost:8080/getCapacityAndToolByRoom"

  constructor(private httpClient : HttpClient) { }

  importExcel(area : String, room : String, capacity : String, time : String, day : String , week:String){
    const body  = {area,room,capacity,time,day,week}
    return this.httpClient.post(this.apiSaveTKB,body)
  }

  getCapacityAndToolByRoom(room : string){
    const body = {room}
    return this.httpClient.post(this.apiGetCapacityAndToolByRoom,body)
  }

  saveRoom(room : String,area : String,capacity : String){
    const body = {room,area,capacity}
    return this.httpClient.post(this.apiSaveRoom,body)
  }

  saveData(tkbs : any){
    console.log(tkbs);
    return this.httpClient.post(this.apiSaveData,tkbs);
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

}
