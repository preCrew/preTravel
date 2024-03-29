package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.dto.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{

    List<Schedule> findByMemberIdx(String id);

    Schedule findByIdx(Long idx);

    List<Schedule> findByMemberIdxAndEndDateLessThanEqual(String idx, LocalDate now);

}
