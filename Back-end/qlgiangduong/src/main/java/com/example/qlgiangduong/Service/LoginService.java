package com.example.qlgiangduong.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.qlgiangduong.Entity.Account;
import com.example.qlgiangduong.Reponsitory.AccountReponsitory;

@Service
public class LoginService {

    @Autowired
    private AccountReponsitory accountReponsitory;

    public String Login(String username, String password){
        Optional<Account> accountOptional = accountReponsitory.findByUsername(username);
        if(accountOptional.isPresent()){
            Account account = accountOptional.get();
            if(account.getPassword().equals(password)){
                return account.getUserType();
            }
        }
        return "";
    }

    public boolean Register(Account account){
        Optional<Account> findUsername = accountReponsitory.findByUsername(account.getUsername());
        if(!findUsername.isPresent()){
            accountReponsitory.save(account);
            return true;
        }
        return false;
    }

    public void updateAccount(String username, String userType,String name){
        Optional<Account> accounts = accountReponsitory.findByUsername(username);
        Account account = accounts.get();
        account.setName(name);
        account.setUserType(userType);
        account.setStatus("1");
    }

}
