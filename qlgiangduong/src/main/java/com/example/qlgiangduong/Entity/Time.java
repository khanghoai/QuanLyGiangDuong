package com.example.qlgiangduong.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Time")
public class Time {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ID;
    private String timeStart;
    private String weekStart;

    public String getTimeStart() {
        return timeStart;
    }
    public void setTimeStart(String timeStart) {
        this.timeStart = timeStart;
    }

    public String getWeekStart() {
        return weekStart;
    }
    public void setWeekStart(String weekStart) {
        this.weekStart = weekStart;
    }
}
