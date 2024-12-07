package com.example.qlgiangduong.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.qlgiangduong.Entity.Account;
import com.example.qlgiangduong.Service.LoginService;

@RestController
@CrossOrigin("http://localhost:4200")
public class LoginController {

    @Autowired
    protected LoginService loginService;
    

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Account account) {
        String userType = loginService.Login(account.getUsername(), account.getPassword());
        Map<String, String> response = new HashMap<>();

        if (!userType.equals("")) {
            response.put("userType", userType);
            return ResponseEntity.status(200).body(response);
        } else {
            response.put("message", "Tên tài khoản hoặc mật khẩu không chính xác!");
            return ResponseEntity.status(400).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> Register(@RequestBody Account account) {
        account.setUserType("0");
        account.setName(null);
        account.setStatus("0");
        boolean check = loginService.Register(account);
        HashMap<String,String> response = new HashMap<>();
        if(check){
            response.put("message","Đăng ký thành công");
            return ResponseEntity.ok(response);
        }
        response.put("message","Đăng ký thất bại");
        return ResponseEntity.status(400).body(response);
    }
}