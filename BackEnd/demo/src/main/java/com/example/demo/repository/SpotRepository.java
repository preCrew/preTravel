package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.Spot;

public interface SpotRepository extends JpaRepository<Spot, Long> {

    List<Spot> findBySctIdx(String sctIdx);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM spot_t WHERE spt_day = :day AND sct_idx = :sctIdx", nativeQuery = true)
    void deleteByDayAndSctIdx(@Param("day") LocalDate day, @Param("sctIdx") String sctIdx);

    void deleteBySctIdx(String sctIdx);

    @Query("SELECT sp FROM Schedule sc JOIN Spot sp ON sc.idx = sp.sctIdx " +
            "WHERE sc.memberIdx = :memberIdx " +
            "AND sp.name = :spotName " +
            "AND sp.latitude = :latitude " +
            "AND sp.longitude = :longitude")
    List<Spot> findSpotsByScheduleAndCriteria(
            @Param("memberIdx") String memberIdx,
            @Param("spotName") String spotName,
            @Param("latitude") String latitude,
            @Param("longitude") String longitude
    );
}
