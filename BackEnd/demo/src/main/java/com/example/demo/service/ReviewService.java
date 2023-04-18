package com.example.demo.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Review;

@Service
public interface ReviewService {

    List<Review> findData(Map<String, Object> map);

    List<Review> findByMemberIdx(String memberIdx);

    Review save(Review review);

    Optional<Review> findByIdx(String idx);

    void deleteById(Long idx);

    List<Review> findByMemberIdxAndAddress(String memberIdx, String address);

}
