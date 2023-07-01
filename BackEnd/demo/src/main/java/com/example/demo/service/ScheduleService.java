package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Schedule;


@Service
public interface ScheduleService {

    List<Schedule> findByMemberIdx(String memberIdx);

    Schedule save(Schedule schedule);

    void deleteById(Map<String, Object> map);

    List<Schedule> findByMemberIdxAndEndDateLessThanEqual(String code, LocalDate now);


}
