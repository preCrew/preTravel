package com.example.demo.service.impl;

import java.util.*;

import com.example.demo.dao.*;
import com.example.demo.dto.*;
import com.example.demo.service.KaKaoService;
import com.example.demo.service.NaverService;
import com.example.demo.util.ReturnUtil;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.service.MemberService;

@Service
@Slf4j
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

        log.info("user Idx : {}",code);
        Member member = memberDao.findByIdx(code);
        result.put("name", member.getName());
        result.put("email", member.getEmail());



        List<LikeSpot> likeSpot = likeSpotDao.findByMemberIdx(code);
        result.put("likeSpot", likeSpot);


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
        Comparator<Spot> sptcomparator = Comparator.comparing(Spot::getDay);
        Collections.sort(spotResult, sptcomparator);

        result.put("spot", spotResult);

        return returnUtil.code200("회원 정보 조회",result);
    }
}
