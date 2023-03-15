package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.LikeSpot;

public interface LikeSpotRepository extends JpaRepository<LikeSpot, Long>{

    List<LikeSpot> findByMemberIdx(String id);

    void deleteById(Long idx);

    List<LikeSpot> findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(Integer smallLa, Integer largeLa, Integer smallLo,
            Integer largeLo, String memberIdx);
            

}
