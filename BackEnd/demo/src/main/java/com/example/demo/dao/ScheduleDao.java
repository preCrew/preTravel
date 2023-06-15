package com.example.demo.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dto.Schedule;
import com.example.demo.repository.ScheduleRepository;

@Component
public class ScheduleDao {

    @Autowired
    ScheduleRepository repository;

    public List<Schedule> findByMemberIdx(String id) {
        return repository.findByMemberIdx(id);
    }

    public Schedule save(Schedule schedule) {
        return repository.save(schedule);
    }

    public void deleteById(Long idx) {
        repository.deleteById(idx);
    }

    public Schedule findByIdx(Long idx) {
        return repository.findByIdx(idx);
    }

    public List<Schedule> findByMemberIdxAndEndDateLessThanEqual(String idx, LocalDate now) {
        return repository.findByMemberIdxAndEndDateLessThanEqual(idx, now);
    }
}
