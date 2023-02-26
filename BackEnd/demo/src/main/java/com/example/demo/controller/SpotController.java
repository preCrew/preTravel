package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.SpotService;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("spot")
@Slf4j
public class SpotController {

    @Autowired
    private SpotService service;

    @Autowired
    private ReturnUtil returnUtil;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> findBySctIdx(String sctIdx) {
        log.info("회원별 여행세부일정 조회");
        Map<String, Object> result = service.findBySctIdx(sctIdx);
        return returnUtil.code200("회원별 여행일정 조회", result);  
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> save(@RequestBody Map<String, Object> map){
        log.info("여행일정 장소저장");
        Map<String, Object> result = new HashMap<>();
        try {
            result = service.save(map);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return returnUtil.code200("회원별 여행일정 저장 성공", result);
    }
}
