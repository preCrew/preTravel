package com.example.demo.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.LikeSpotDao;
import com.example.demo.dto.LikeSpot;
import com.example.demo.service.LikeSpotService;

@Service
public class ILikeSpotService implements LikeSpotService{

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
        Integer smallLa = Integer.valueOf(map.get("smallLa").toString());
        Integer largeLa = Integer.valueOf(map.get("largeLa").toString());
        Integer smallLo = Integer.valueOf(map.get("smallLo").toString());
        Integer largeLo = Integer.valueOf(map.get("largeLo").toString());
        String memberIdx = (String) map.get("memberIdx");
        List<LikeSpot> list = dao.findByLatitudeBetweenAndLongitudeBetweenAndMemberIdx(smallLa, largeLa, smallLo, largeLo, memberIdx);
        
        return list;
    }

}
