package com.example.demo.service.impl;

import com.example.demo.dao.MemberDao;
import com.example.demo.dao.SpotDao;
import com.example.demo.dto.Member;
import com.example.demo.dto.SpotRequestDTO;
import com.example.demo.entity.Period;
import com.example.demo.entity.Spot;
import com.example.demo.repository.PeriodRepository;
import com.example.demo.repository.SpotRepository;
import com.example.demo.service.SpotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ISpotService implements SpotService {

    @Autowired
    SpotDao spotDao;

    @Autowired
    MemberDao memberDao;

    @Autowired
    PeriodRepository periodRepository;

    @Override
    public List<Spot> findByMemberIdxAndPeriodNum(long memberIdx, long periodNum) {
        return spotDao.searchByMemberIdxAndPeriodNum(memberIdx, periodNum);
    }

    @Override
    public void addSpotWithSpotRequestAndMemberEmail(SpotRequestDTO request, String email) {

        Timestamp date = new Timestamp(new Date().getTime());

        List<Member> members = memberDao.findByEmail(email);
        Member member = members.get(0);

        Period period = periodRepository.findByNum(request.getPeriodNum());

        Spot spot = new Spot();
        spot.setSequence((long) spotDao.searchByMemberIdxAndPeriodNum(
                        member.getIdx(),
                        request.getPeriodNum()).size() + 1);
        spot.setMember(member);
        spot.setPeriod(period);
        spot.setSubject(request.getSubject());
        spot.setContent(request.getContent());
        spot.setScore(request.getScore());
        spot.setLike(request.getLike());
        spot.setRevisit(request.getRevisit());
        spot.setCreateDate(date);
        spot.setModifyDate(date);
        spotDao.save(spot);
    }
}
