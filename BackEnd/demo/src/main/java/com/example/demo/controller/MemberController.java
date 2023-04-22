package com.example.demo.controller;

import com.example.demo.dao.LikeSpotDao;
import com.example.demo.dao.MemberDao;
import com.example.demo.dao.ScheduleDao;
import com.example.demo.dao.SpotDao;
import com.example.demo.dto.LikeSpot;
import com.example.demo.dto.Member;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.KaKaoService;
import com.example.demo.service.MemberService;
import com.example.demo.util.ReturnUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class MemberController {

    @Autowired
    MemberService service;

    @GetMapping("/myPage")
    public ResponseEntity<ResponseDTO> findMember(String code) {

        return service.findMyPageData(code);
    }

}
