package com.example.demo.repository;

import com.example.demo.entity.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface SpotRepository extends JpaRepository<Spot, Long> {

    ArrayList<Spot> findAll();

    Spot findByNum(long num);

    ArrayList<Spot> findByMemberIdxAndPeriodNum(long memberIdx, long periodNum);

//    Integer save(Spot spot);
}
