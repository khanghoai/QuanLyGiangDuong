package com.example.qlgiangduong.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.qlgiangduong.Entity.Room;
import com.example.qlgiangduong.Entity.Time;
import com.example.qlgiangduong.Reponsitory.RoomReponsitory;
import com.example.qlgiangduong.Reponsitory.TimeReponsitory;

@Service
public class RoomService {
    @Autowired
    private RoomReponsitory roomReponsitory;
    @Autowired
    private TimeReponsitory timeReponsitory;

    public boolean ImportExcel(Room room){
        roomReponsitory.save(room);
        return true;
    }

    public void SaveData(List<Room> rooms){
        roomReponsitory.deleteByArea(rooms.get(0).getArea());
        for (Room room : rooms) {
            roomReponsitory.save(room);
        }
    }

    public List<Time> getStartTime(){
        return timeReponsitory.findAll();
    }

    public void setStartTime(Time time){
        timeReponsitory.deleteAll();
        timeReponsitory.save(time);
    }

    public List<String> getAllArea(){
        return roomReponsitory.getAllArea();
    }

    public List<String> getAllRoomByArea(String area){
        return roomReponsitory.getAllRoomByArea(area);
    }

    public List<String> getAllRoom(){
        return roomReponsitory.getAllRoom();
    }

    public List<Object> getTimeAndWeekByRoomAndDay(String room, String day){
        return roomReponsitory.getTimeAndWeekByRoomAndDay(room,day);
    }

    public List<Room> findByRoomAndDay(String room, String day){
        return roomReponsitory.findByRoomAndDay(room, day);
    }
}
