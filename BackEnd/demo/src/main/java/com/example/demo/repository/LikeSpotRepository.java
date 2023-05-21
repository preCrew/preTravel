package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.LikeSpot;

public interface LikeSpotRepository extends JpaRepository<LikeSpot, Long> {

    List<LikeSpot> findByMemberIdx(String id);

    void deleteById(Long idx);

    List<LikeSpot> findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(Double smallLa, Double largeLa, Double smallLo,
            Double largeLo, String memberIdx);

    List<LikeSpot> findByMemberIdxAndAddress(String memberIdx, String address);

    List<LikeSpot> findByNameAndMemberIdxAndLatitudeAndLongitude(String name, String memberIdx, Double latitude, Double longitude);

}
