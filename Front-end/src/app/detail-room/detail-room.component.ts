import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-detail-room',
    templateUrl: './detail-room.component.html',
    styleUrl: './detail-room.component.css',
    standalone: false
})
export class DetailRoomComponent{
  private data : any;
  capacity : string;

  constructor(private dataService : DataService,private router : Router){
    this.data = dataService.getData();
    this.loadDetailRoom(dataService.getRoom());
  }

  loadDetailRoom(room : String){
    for(let i = 0;i<this.data.length;i++){
      if(this.data[i].room == room){
        this.capacity = this.data[i].capacity;
        break;
      }
    }
  }
}
