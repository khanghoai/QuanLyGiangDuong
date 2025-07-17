import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { RoomService } from '../service/room.service';
import { executeSchedule } from 'rxjs/internal/util/executeSchedule';
import { PointerFocusTracker } from '@angular/cdk/menu';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrl: './admin-page.component.css',
    standalone: false
})
export class AdminPageComponent {

  constructor(private roomService : RoomService){}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const area : string = (file.name[0]+file.name[1]).toUpperCase();
    const rooms = new Array();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      this.getTimeStart(workbook);
      for(let j = 0; j<workbook.SheetNames.length;j++){
        const SheetName = workbook.SheetNames[j];
        const worksheet = workbook.Sheets[SheetName];
        
        const sheet : [][] = XLSX.utils.sheet_to_json(worksheet,{range : 9,header: 1});
        let row10 : String = sheet[0].slice(4)[0]; //Học kỳ: 01 - Năm học: 2024-2025
        let row10Split : String[] = row10.split(" ");
        let kyHoc = row10Split[2];
        let namHoc = row10Split[6];
        let row12 : String = sheet[2].slice(1)[0];
        // Sample : Phòng: A4.39 (Sức chứa: 40)
        const roomFIndex = row12.indexOf(":")+2;
        const roomLIndex = row12.indexOf(" ",roomFIndex)
        const tenPhong = row12.slice(roomFIndex,roomLIndex);
        let row13 : String = sheet[3].slice(1)[0]
        let row13Split : String[] = row13.split("(");
        let batDau = row13Split[1].substring(0,row13Split[1].length-1)
        const excelData : [][] = XLSX.utils.sheet_to_json(worksheet, {range :18,header:1});
        for(let i = 0;i<excelData.length-11;i++){
          area.toUpperCase();
          const thu : string = this.convertDay(excelData[i].slice(16,17)[0]);
          const tiet : string = excelData[i].slice(19,20)[0];
          const tuan : string = excelData[i].slice(23,24)[0];
          let tool : string = "__";
          if(area == "A1"){
            tool = "12"
          }
          const roomData = {tenPhong,thu,tiet,tuan,namHoc,batDau,kyHoc}
          rooms.push(roomData);
        }
      }
      this.roomService.saveData(rooms).subscribe(
        response => {},
        error => {
          console.error('Ko có dữ liệu', error);
        }
      );
    };
    reader.readAsBinaryString(file);
  }

  getTimeStart(workbook : XLSX.WorkBook){
    const SheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[SheetName];
    const sheet : [][] = XLSX.utils.sheet_to_json(worksheet,{range : 15,header: 1});
    const row : String = sheet[0].slice(1)[0]
    const timeStart = row.slice(7,17);
    const weekStart = row.slice(5,6);
    // this.roomService.getTimeStart().subscribe((res : any)=>{
    //   if(res[0] == undefined || res[0].timeStart != timeStart){
    //     this.roomService.setTimeStart(timeStart,weekStart).subscribe(
    //       response => {},
    //       error => {
    //         console.error('Ko có dữ liệu', error);
    //       }
    //     );
    //   }
    //   else{
    //   }
    // });
  }

  convertDay(day : string){
    if(day == "Thứ Hai"){
      return "MON";
    }
    if(day == "Thứ Ba"){
      return "TUE";
    }
    if(day == "Thứ Tư"){
      return "WED";
    }
    if(day == "Thứ Năm"){
      return "THU";
    }
    if(day == "Thứ Sáu"){
      return "FRI";
    }
    if(day == "Thứ Bảy"){
      return "SAT";
    }
    return "SUN";
  }
}