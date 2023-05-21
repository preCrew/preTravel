package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Location;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.LocationService;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("map")
@Slf4j
public class LocationController {

    @Autowired
    private LocationService service;

    @Autowired
    private ReturnUtil returnUtil;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> searchAll(String keyword) {
        log.info("지역조회");
        List<Location> list = service.searchAll(keyword);
        return returnUtil.code200("지역조회 결과", list);
    }

    @GetMapping("place")
    public ResponseEntity<ResponseDTO> searchPlace(String keyword, String page) {
        log.info("장소조회");
        Map<String, Object> result = service.searchPlace(keyword, page);
        return returnUtil.code200("장소조회 결과", result);
    }

    @GetMapping("address")
    public ResponseEntity<ResponseDTO> getLikeReview(String memberIdx, String address) {
        log.info("찜한장소 리뷰조회");
        Map<String, Object> result = service.getLikeReview(memberIdx, address);
        return returnUtil.code200("찜한장소, 리뷰조회 결과", result);
    }
}
