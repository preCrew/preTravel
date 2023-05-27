package com.example.demo.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.LikeSpotDao;
import com.example.demo.dto.LikeSpot;
import com.example.demo.service.LikeSpotService;

@Service
public class ILikeSpotService implements LikeSpotService {

    @Autowired
    LikeSpotDao dao;

    @Override
    public List<LikeSpot> findByMemberIdx(String id) {
        return dao.findByMemberIdx(id);
    }

    @Override
    public LikeSpot save(LikeSpot like) {
        return dao.save(like);
    }

    @Override
    public void deleteById(Long idx) {
        dao.deleteById(idx);
    }

    @Override
    public List<LikeSpot> findData(Map<String, Object> map) {
        Double smallLa = Double.valueOf(map.get("smallLa").toString());
        Double largeLa = Double.valueOf(map.get("largeLa").toString());
        Double smallLo = Double.valueOf(map.get("smallLo").toString());
        Double largeLo = Double.valueOf(map.get("largeLo").toString());
        String memberIdx = (String) map.get("memberIdx");
        List<LikeSpot> list = dao.findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(smallLa, largeLa, smallLo,
                largeLo, memberIdx);

        return list;
    }

    @Override
    public List<LikeSpot> findByMemberIdxAndAddress(String memberIdx, String address) {
        return dao.findByMemberIdxAndAddress(memberIdx, address);
    }

    @Override
    public List<LikeSpot> findByNameAndMemberIdxAndLatitudeAndLongitude(String name, String memberIdx, Double latitude, Double longitude) {
        return dao.findByNameAndMemberIdxAndLatitudeAndLongitude(name, memberIdx, latitude, longitude);
    }

}
