package com.example.qlgiangduong.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.qlgiangduong.Entity.Room;

import jakarta.transaction.Transactional;

import java.util.List;


@Repository
public interface RoomReponsitory extends JpaRepository<Room,Integer> {

    @Query("Select area from Room Group by area order By area ASC")
    List<String> getAllArea();

    @Query("Select room from Room where area = ?1 Group by room")
    List<String> getAllRoomByArea(String areaChose);

    @Query("Select room from Room group by room order by room ASC")
    List<String> getAllRoom();

    @Query("Select time,week from Room where room = ?1 and day = ?2")
    List<Object> getTimeAndWeekByRoomAndDay(String room,String day);

    

    @Transactional
    Long deleteByArea(String area);

    List<Room> findByRoomAndDay(String room,String day);
}
