package com.example.demo.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ReviewDao;
import com.example.demo.dto.Review;
import com.example.demo.service.ReviewService;

@Service
public class IReviewService implements ReviewService {

    @Autowired
    ReviewDao dao;

    @Override
    public List<Review> findData(Map<String, Object> map) {
        Double smallLa = Double.valueOf(map.get("smallLa").toString());
        Double largeLa = Double.valueOf(map.get("largeLa").toString());
        Double smallLo = Double.valueOf(map.get("smallLo").toString());
        Double largeLo = Double.valueOf(map.get("largeLo").toString());
        String memberIdx = (String) map.get("memberIdx");

        List<Review> list = dao.findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(smallLa, largeLa, smallLo, largeLo,
                memberIdx);

        return list;
    }

    @Override
    public List<Review> findByMemberIdx(String memberIdx) {
        return dao.findByMemberIdx(memberIdx);
    }

    @Override
    public Optional<Review> findByIdx(String idx) {
        Optional<Review> optReview = dao.findByIdx(idx);
        String address = optReview.get().getAddress();
        String[] parts = address.trim().split("\\s+");
        String cityAndProvince = parts[0] + " " + parts[1];
        optReview.get().setAddress(cityAndProvince);
        return optReview;
    }

    @Override
    public Review save(Review review) {
        if (review.getIdx() == null) {
            return dao.save(review);
        } else {
            Optional<Review> optReview = dao.findById(review.getIdx());
            LocalDateTime creDateTime = optReview.get().getCreateDate();
            Review mdfReview = dao.save(review);
            mdfReview.setCreateDate(creDateTime);
            return mdfReview;
        }
    }

    @Override
    public void deleteById(Long idx) {
        dao.deleteById(idx);
    }

}
