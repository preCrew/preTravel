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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.Schedule;
import com.example.demo.service.ScheduleService;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("schedule")
@Slf4j
public class ScheduleController {

    @Autowired
    private ScheduleService service;

    @Autowired
    private ReturnUtil returnUtil;

    @GetMapping("")
    public ResponseEntity<ResponseDTO> findByMemberIdx(String memberIdx) {
        log.info("회원별 여행일정 조회");
        List<Schedule> list = service.findByMemberIdx(memberIdx);
        return returnUtil.code200("회원별 여행일정 조회", list);
    }

    @PostMapping("")
    public ResponseEntity<ResponseDTO> saveSchedule(@RequestBody Schedule schedule) {
        log.info("여행일정 생성");
        if (schedule.getStartDate() == null) {
            return returnUtil.code400("시작날짜가 없습니다.");
        }
        if (schedule.getEndDate() == null) {
            return returnUtil.code400("종료날짜가 없습니다.");
        }

        Schedule dto = service.save(schedule);
        if (dto == null) {
            return returnUtil.code400("스케줄 생성실패, file index를 체크하세요");
        }
        return returnUtil.code200("여행일정 저장", dto);
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDTO> delete(@RequestBody Map<String, Object> map) {
        log.info("여행일정 삭제");
        service.deleteById(map);
        return returnUtil.code200("여행일정 삭제", "");
    }

}
