package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;
import com.example.demo.dto.LikeSpot;
import com.example.demo.dto.Member;
import com.example.demo.dto.Schedule;
import com.example.demo.service.LikeSpotService;
import com.example.demo.service.MemberService;
import com.example.demo.service.ReviewService;
import com.example.demo.service.ScheduleService;
import com.example.demo.service.SpotService;

@Service
public class IMemberService implements MemberService {

    @Autowired
    MemberDao dao;

    @Autowired
    LikeSpotService likeSpotService;

    @Autowired
    ReviewService reviewService;

    @Autowired
    ScheduleService scheduleService;

    @Autowired
    SpotService spotService;

    @Override
    public List<Member> findAll() {
        List<Member> list = dao.findAll();
        return list;
    }

    @Override
    public List<Member> findByEmail(String email) {
        return dao.findByEmail(email);
    }

    @Override
    public void save(Member mem) {
        dao.save(mem);
    }

    @Override
    public Map<String, Object> findByIdx(String code) {
        Map<String, Object> result = new HashMap<>();

        Member member = dao.findByIdx(code);
        List<LikeSpot> likeList = likeSpotService.findByMemberIdx(code);
        Object review = reviewService.findByMemberIdx(code, 0, 0);
        List<Schedule> list = scheduleService.findByMemberIdxAndEndDateLessThanEqual(code, LocalDate.now());
        List<Map<String, Object>> spotList = new ArrayList<>();

        for (Schedule schedule : list) {
            Map<String, Object> map = spotService.findBySctIdx(schedule.getIdx().toString());
            map.remove("dateRange");
            spotList.add(map);
        }

        result.put("member", member);
        result.put("likeSpot", likeList);
        result.put("review", review);
        result.put("schedule", spotList);
        return result;
    }

}
