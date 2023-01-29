package com.example.demo.repository;

import com.example.demo.entity.Period;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeriodRepository extends JpaRepository<Period, Long> {
    Period findByNum(long num);
}
