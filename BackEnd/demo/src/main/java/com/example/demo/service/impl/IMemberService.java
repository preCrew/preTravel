package com.example.demo.service.impl;

import java.util.*;

import com.example.demo.dao.*;
import com.example.demo.dto.*;
import com.example.demo.service.KaKaoService;
import com.example.demo.service.NaverService;
import com.example.demo.util.ReturnUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.service.MemberService;

@Service
public class IMemberService implements MemberService{


    @Autowired
    ReturnUtil returnUtil;

    @Autowired
    MemberDao memberDao;
    @Autowired
    LikeSpotDao likeSpotDao;

    @Autowired
    ReviewDao reviewDao;
    @Autowired
    SpotDao spotDao;
    @Autowired
    ScheduleDao scheduleDao;

    @Override
    public List<Member> findAll() {
        List<Member> list = memberDao.findAll();
        return list;
    }

    @Override
    public List<Member> findByEmail(String email) {
        return memberDao.findByEmail(email);
    }

    @Override
    public void save(Member mem) {
        memberDao.save(mem);
    }

    @Override
    public ResponseEntity<ResponseDTO> findMyPageData(String code) {

        Map<String, Object> result = new HashMap<>();

        System.out.println(code);
        Member member = memberDao.findByIdx(code);
        result.put("name", member.getName());
        result.put("email", member.getEmail());



        List<LikeSpot> likespot = likeSpotDao.findByMemberIdx(code);
        result.put("likespot", likespot);


        //create date 기준으로 sort
        List<Review> reviewedSchedule = reviewDao.findByMemberIdx(code);
        result.put("reviewedSchedule", reviewedSchedule);


        //create date 기준으로 sort
        List<Schedule> scheduleList = scheduleDao.findByMemberIdx(code);
        List<Spot> spotResult = new ArrayList<>();
        for (Schedule schedule : scheduleList) {
            List<Spot> spotList = spotDao.findBySctIdx(String.valueOf(schedule.getIdx()));
            for (Spot spot : spotList) {
                spotResult.add(spot);
            }
        }
        System.out.println(spotResult);
        Comparator<Spot> comparator = Comparator.comparing(Spot::getCreateDate);
        Collections.sort(spotResult, comparator);
        System.out.println(spotResult);

        result.put("schedule", scheduleList);



        return returnUtil.code200("회원 정보 조회",result);
    }
}
