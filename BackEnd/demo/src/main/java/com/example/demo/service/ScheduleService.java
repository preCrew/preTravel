package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Schedule;


@Service
public interface ScheduleService {

    List<Schedule> findByMemberIdx(String memberIdx);

    Schedule save(Schedule schedule);

    void deleteById(Long idx);


}
