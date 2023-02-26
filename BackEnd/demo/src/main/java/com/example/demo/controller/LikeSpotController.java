package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LikeSpot;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.LikeSpotService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("like")
@Slf4j
public class LikeSpotController {

    @Autowired
    private LikeSpotService service;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> findByMemberIdx(String memberIdx) {
        log.info("회원별 찜한장소 조회");
        List<LikeSpot> list = service.findByMemberIdx(memberIdx);
        return ResponseEntity
                .ok()
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("찜한장소 조회")
                        .data(list)
                        .build());
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> saveLike(LikeSpot like) {
        log.info("찜한장소 저장");
        LikeSpot dto = service.save(like);
        return ResponseEntity
                .ok()
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("찜한장소 저장")
                        .data(dto)
                        .build());
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDTO> deleteLike(Long idx) {
        log.info("찜한장소 삭제");
        service.deleteById(idx);
        return ResponseEntity
                .ok()
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("찜한장소 삭제")
                        .data("")
                        .build());
    }
}
