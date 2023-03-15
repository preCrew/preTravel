package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ScheduleDao;
import com.example.demo.dto.Schedule;
import com.example.demo.service.ScheduleService;
import com.example.demo.service.SpotService;

@Service
public class IScheduleService implements ScheduleService{

    @Autowired
    ScheduleDao dao;

    @Autowired
    SpotService spotService;

    @Override
    public List<Schedule> findByMemberIdx(String memberIdx) {
        return dao.findByMemberIdx(memberIdx);
    }

    @Override
    public Schedule save(Schedule schedule) {
        return dao.save(schedule);
    }

    @Override
    public void deleteById(Long idx) {
        spotService.deleteBySctIdx(idx); //0226 스케줄 지워질때 지우면 리뷰도 같이날라가서 리뷰는 따로 테이블에 관리해야함
        dao.deleteById(idx);
    }

}
