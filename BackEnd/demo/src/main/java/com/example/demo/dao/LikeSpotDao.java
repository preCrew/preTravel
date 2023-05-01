package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dto.LikeSpot;
import com.example.demo.repository.LikeSpotRepository;

@Component
public class LikeSpotDao {

    @Autowired
    LikeSpotRepository repository;

    public List<LikeSpot> findByMemberIdx(String id) {
        return repository.findByMemberIdx(id);
    }

    public LikeSpot save(LikeSpot like) {
        return repository.save(like);
    }

    public void deleteById(Long idx) {
        repository.deleteById(idx);
    }

    public List<LikeSpot> findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(Double smallLa, Double largeLa,
            Double smallLo,
            Double largeLo, String memberIdx) {
        return repository.findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(smallLa, largeLa, smallLo, largeLo,
                memberIdx);
    }

    public List<LikeSpot> findByMemberIdxAndAddress(String memberIdx, String address) {
        return repository.findByMemberIdxAndAddress(memberIdx, address);
    }

    public List<LikeSpot> findByNameAndMemberIdxAndLatitudeAndLongitude(String name, String memberIdx, Double latitude, Double longitude) {
        return repository.findByNameAndMemberIdxAndLatitudeAndLongitude(name, memberIdx, latitude, longitude);
    }

}
