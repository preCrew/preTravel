package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.Review;
import com.example.demo.service.ReviewService;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("review")
@Slf4j
public class ReviewController {

    @Autowired
    private ReviewService service;

    @Autowired
    private ReturnUtil returnUtil;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> findData(@RequestParam Map<String, Object> map) {
        log.info("범위내 리뷰 조회");
        List<Review> list = service.findData(map);
        return returnUtil.code200("범위내 리뷰 조회", list);
    }

    @GetMapping("member")
    public ResponseEntity<ResponseDTO> findByMemberIdx(String memberIdx, Integer page, Integer size) {
        log.info("회원별 리뷰조회");
        Object list = service.findByMemberIdx(memberIdx, page, size);
        return returnUtil.code200("회원별 리뷰조회", list);
    }

    @GetMapping("detail")
    public ResponseEntity<ResponseDTO> findByIdx(String idx) {
        log.info("리뷰 상세 조회");
        Map<String, Object> review = service.findByIdx(idx);
        return returnUtil.code200("리뷰 상세 조회", review);
    }

    @GetMapping("name")
    public ResponseEntity<ResponseDTO> findByNameAndLatitudeAndLongitude(String name, String latitude, String longitude) {
        System.out.println(name + latitude + longitude);
        log.info("리뷰 이름, 위경도 조회");
        List<Review> review = service.findByNameAndLatitudeAndLongitude(name, latitude, longitude);
        return returnUtil.code200("리뷰 이름, 위경도 조회", review);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> saveReview(@RequestBody Review review) {
        log.info("리뷰 생성&수정");
        Review dto = service.save(review);
        return returnUtil.code200("리뷰 생성&수정 성공", dto);
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDTO> deleteSchedule(Long idx) {
        log.info("리뷰 삭제");
        service.deleteById(idx);
        return returnUtil.code200("리뷰삭제 성공", "");
    }
}
