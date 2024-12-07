package com.example.qlgiangduong.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomID;
    private String area;
    private String room;
    private String capacity;
    private String time;
    private String day;
    private String week;
    private String tool;
    
    public String getCapacity() {
        return capacity;
    }
    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getTool() {
        return tool;
    }
    public void setTool(String tool) {
        this.tool = tool;
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
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public String getDay() {
        return day;
    }
    public void setDay(String day) {
        this.day = day;
    }
    public String getWeek() {
        return week;
    }
    public void setWeek(String week) {
        this.week = week;
    }
}
