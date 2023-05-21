package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Location;

@Service
public interface LocationService {

    List<Location> searchAll(String keyword);

    Map<String, Object> searchPlace(String keyword, String page);

    Map<String, Object> getLikeReview(String memberIdx, String address);

}
