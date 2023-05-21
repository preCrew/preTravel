package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LikeSpot;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.LikeSpotService;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("like")
@Slf4j
public class LikeSpotController {

    @Autowired
    private LikeSpotService service;

    @Autowired
    private ReturnUtil returnUtil;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> findByMemberIdx(String memberIdx) {
        log.info("회원별 찜한장소 조회");
        List<LikeSpot> list = service.findByMemberIdx(memberIdx);
        return returnUtil.code200("찜한장소 조회", list);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> saveLike(LikeSpot like) {
        log.info("찜한장소 저장");
        LikeSpot dto = service.save(like);
        return returnUtil.code200("찜한장소 저장", dto);
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDTO> deleteLike(Long idx) {
        log.info("찜한장소 삭제");
        service.deleteById(idx);
        return returnUtil.code200("찜한장소 삭제", "");
    }

    @GetMapping("map")
    public ResponseEntity<ResponseDTO> findData(@RequestParam Map<String, Object> map) {
        log.info("범위내 찜한장소 조회");
        List<LikeSpot> list = service.findData(map);
        return returnUtil.code200("범위내 찜한장소 조회", list);
    }

    @GetMapping("search")
    public ResponseEntity<ResponseDTO> findByNameAndMemberIdxAndLatitudeAndLongitude(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "latitude") Double latitude,
            @RequestParam(value = "longitude") Double longitude,
            @RequestParam(value = "memberIdx") String memberIdx) {
        List<LikeSpot> list = service.findByNameAndMemberIdxAndLatitudeAndLongitude(name, memberIdx, latitude,
                longitude);
        log.info("회원별 장소 위경도 조회");
        return returnUtil.code200("위경도, 장소 찜한장소 조회", list);
    }
}
