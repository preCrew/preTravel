package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.example.demo.dto.Review;
import com.example.demo.repository.ReviewRepository;

@Component
public class ReviewDao {

    @Autowired
    ReviewRepository repository;

    public List<Review> findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(Double smallLa, Double largeLa,
            Double smallLo, Double largeLo, String memberIdx) {
        return repository.findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(smallLa, largeLa, smallLo, largeLo,
                memberIdx);
    }

    public List<Review> findByMemberIdx(String memberIdx) {
        return repository.findBymemberIdx(memberIdx);
    }

    public List<Review> findByMemberIdxPage(String memberIdx, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Review> data = repository.findByMemberIdx(memberIdx, pageable);
        
        return data.getContent();
    }
    
    public Optional<Review> findByIdx(String idx) {
        return repository.findById(Long.parseLong(idx));
    }

    public Review save(Review review) {
        return repository.save(review);
    }

    public void deleteById(Long idx) {
        repository.deleteById(idx);
    }

    public Optional<Review> findById(Long idx) {
        return repository.findById(idx);
    }

    public List<Review> findByMemberIdxAndAddress(String memberIdx, String address) {
        return repository.findByMemberIdxAndAddress(memberIdx, address);
    }

    public List<Review> findByNameAndLatitudeAndLongitude(String name, Double latitude, Double longitude) {
        return repository.findByNameAndLatitudeAndLongitude(name, latitude, longitude);
    }

}
