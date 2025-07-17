package com.example.qlgiangduong.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeReponsitory extends JpaRepository<com.example.qlgiangduong.Entity.Time,Integer> {

}
