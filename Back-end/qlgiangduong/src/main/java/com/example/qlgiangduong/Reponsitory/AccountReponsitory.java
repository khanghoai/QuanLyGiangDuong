package com.example.qlgiangduong.Reponsitory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.qlgiangduong.Entity.Account;
import java.util.Optional;


@Repository
public interface AccountReponsitory extends JpaRepository<Account,Integer> {
    Optional<Account> findByUsername(String username);
}
