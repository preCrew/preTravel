package com.example.demo.controller;

import com.example.demo.dto.SpotRequestDTO;
import com.example.demo.entity.Spot;
import com.example.demo.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/spot")
public class SpotController {

    @Autowired
    SpotService spotService;

    @GetMapping("/list")
    public ResponseEntity<?> getSpots() {
        long memberIdx = 1;
        long periodNum = 1;
        List<Spot> list = spotService.findByMemberIdxAndPeriodNum(memberIdx, periodNum);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createSpot(@RequestBody SpotRequestDTO requestDTO) {
        return ResponseEntity.ok("success");
    }
}
