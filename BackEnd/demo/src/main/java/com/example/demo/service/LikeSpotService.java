package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.LikeSpot;



@Service
public interface LikeSpotService {

    List<LikeSpot> findByMemberIdx(String id);

    LikeSpot save(LikeSpot like);

    void deleteById(Long idx);

    List<LikeSpot> findData(Map<String, Object> map);




}
