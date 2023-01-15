package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Location;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.LocationService;

@RestController
@RequestMapping("map")
public class LocationController {

    @Autowired
    private LocationService service;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> searchAll(String keyword) {
        List<Location> list = service.searchAll(keyword);
        return ResponseEntity
                .ok()
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("로그인 성공")
                        .data(list)
                        .build());
    }
}
