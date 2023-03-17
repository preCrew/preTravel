package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.dao.LikeSpotDao;
import com.example.demo.dao.ScheduleDao;
import com.example.demo.dao.SpotDao;
import com.example.demo.dto.LikeSpot;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.Schedule;
import com.example.demo.service.KaKaoService;
import com.example.demo.service.NaverService;
import com.example.demo.util.ReturnUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;
import com.example.demo.dto.Member;
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

        String email = "kmk990418@daum.net";
        Member member = memberDao.findByEmail(email).get(0);
        result.put("member", member);

        String memberIdx = String.valueOf(member.getIdx());

        LikeSpot likespot = likeSpotDao.findByMemberIdx(memberIdx).get(0);
        result.put("likespot", likespot);

        //review 있는 스케쥴만
        Schedule reviewedSchedule = scheduleDao.findByMemberIdx(memberIdx).get(0);
        result.put("reviewedSchedule", reviewedSchedule);

        Schedule schedule = scheduleDao.findByMemberIdx(memberIdx).get(0);
        result.put("schedule", schedule);



        return returnUtil.code200("회원 정보 조회",result);
    }
}
