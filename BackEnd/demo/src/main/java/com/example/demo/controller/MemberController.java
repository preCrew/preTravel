package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.MemberService;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class MemberController {
    
    @Autowired
    private MemberService service;

    @Autowired
    private ReturnUtil returnUtil;

    @GetMapping("/myPage")
    public ResponseEntity<ResponseDTO> findByIdx(String memberIdx) {
        log.info("My Page 조회");
        Map<String, Object> result = service.findByIdx(memberIdx);
        return returnUtil.code200("회원정보 조회", result);
    }
}
