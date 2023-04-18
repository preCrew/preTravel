package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.dto.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(Double smallLa, Double largeLa, Double smallLo,
            Double largeLo, String memberIdx);

    List<Review> findBymemberIdx(String memberIdx);

    Review findByIdx(Long idx);

    List<Review> findByMemberIdxAndAddress(String memberIdx, String address);

}
