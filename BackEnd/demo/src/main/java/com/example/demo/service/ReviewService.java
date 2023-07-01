package com.example.demo.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Review;

@Service
public interface ReviewService {

    List<Review> findData(Map<String, Object> map);

    Object findByMemberIdx(String memberIdx, Integer page, Integer size);

    Review save(Review review);

    Map<String, Object> findByIdx(String idx);

    void deleteById(Long idx);

    List<Review> findByMemberIdxAndAddress(String memberIdx, String address);

    List<Review> findByNameAndAndMemberIdxAndLatitudeAndLongitude(String name, String memberIdx, String latitude, String longitude);

}
