package com.example.qlgiangduong.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.qlgiangduong.Entity.Room;
import com.example.qlgiangduong.Entity.Time;
import com.example.qlgiangduong.Service.RoomService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;







@RestController
@CrossOrigin("http://localhost:4200")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/importExcel")
    public ResponseEntity<Map<String,String>> ImportExcel(@RequestBody Room room) {
        boolean check = roomService.ImportExcel(room);
        HashMap<String,String> response = new HashMap<>();
        if(check){
            response.put("message","Thành công");
            return ResponseEntity.ok(response);
        }
        response.put("message","Ko có dữ liệu");
        return ResponseEntity.status(400).body(response);
    } 

    @PostMapping("/saveData")
    public boolean SaveData(@RequestBody List<Room> rooms) {
        roomService.SaveData(rooms);
        return true;
    }
    

    @GetMapping("/getStartTime")
    public ResponseEntity<List<Time>> getStartTime() {
        return ResponseEntity.ok(roomService.getStartTime());
    }

    @GetMapping("/getAllArea")
    public List<String> getAllArea() {
        return roomService.getAllArea();
    }

    @GetMapping("/getAllRoom")
    public List<String> getAllRoom() {
        return roomService.getAllRoom();
    }
    

    @PostMapping("/getAllRoomByArea")
    public List<String> getAllRoomByArea(@RequestBody Room room) {
        return roomService.getAllRoomByArea(room.getArea());
    }

    @PostMapping("/getTimeAndWeekByRoomAndDay")
    public List<Object> postMethodName(@RequestBody Room room) {
        return roomService.getTimeAndWeekByRoomAndDay(room.getRoom(), room.getDay());
    }

    @PostMapping("/findByRoomAndDay")
    public List<Room> findByRoomAndDay(@RequestBody Room room) {
        return roomService.findByRoomAndDay(room.getRoom(), room.getDay());
    }
    
    @PostMapping("/setStartTime")
    public ResponseEntity<Map<String,String>> setStartTime(@RequestBody Time time) {
        roomService.setStartTime(time);
        HashMap<String,String> response = new HashMap<>();
        response.put("message",time.getTimeStart());
        return ResponseEntity.ok(response);
    }
}
