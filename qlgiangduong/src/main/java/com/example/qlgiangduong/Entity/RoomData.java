package com.example.qlgiangduong.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "RoomData")
public class RoomData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int RoomDataID;
    private String room;
    private String area;
    private String capacity;

    public String getCapacity() {
        return capacity;
    }
    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public String getRoom() {
        return room;
    }
    public void setRoom(String room) {
        this.room = room;
    }
}
