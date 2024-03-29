package com.example.demo.service.impl;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.dao.LocationDao;
import com.example.demo.dto.LikeSpot;
import com.example.demo.dto.Location;
import com.example.demo.dto.Review;
import com.example.demo.service.LikeSpotService;
import com.example.demo.service.LocationService;
import com.example.demo.service.ReviewService;
import com.example.demo.util.ResponseUtil;

@Service
public class ILocationService implements LocationService {

    @Autowired
    LocationDao dao;

    @Value("${oauth.kakao.map.rest_api_key}")
    private String REEST_API_KEY;

    @Value("${oauth.kakao.map.host}")
    private String HOST;

    @Autowired
    LikeSpotService likeSpotService;

    @Autowired
    ReviewService reviewService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    ResponseUtil responseUtil;

    @Override
    public List<Location> searchAll(String keyword) {
        return dao.searchAll(keyword);
    }

    @Override
    public Map<String, Object> searchPlace(String keyword, String page) {
        String size = "15";
        JSONObject jo = getPlaceData(keyword, page, size);
        List<Object> list = (List<Object>) jo.get("documents");
        Map<String, Object> meta = (Map<String, Object>) jo.get("meta");
        Map<String, Object> pageMap = new HashMap<>();
        pageMap.put("page", page);
        pageMap.put("size", size);
        pageMap.put("total", meta.get("total_count"));
        pageMap.put("isEnd", meta.get("is_end"));

        List<Object> dataList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> dataMap = new HashMap<>();
            Map<String, Object> map = (Map<String, Object>) list.get(i);
            dataMap.put("address", map.get("address_name"));
            dataMap.put("name", map.get("place_name"));
            dataMap.put("roadAddress", map.get("road_address_name"));
            dataMap.put("x", map.get("x"));
            dataMap.put("y", map.get("y"));
            dataList.add(dataMap);
        }

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("reuslt", dataList);
        resultMap.put("page", pageMap);
        return resultMap;
    }

    private JSONObject getPlaceData(String keyword, String page, String size) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        httpHeaders.add("Authorization", "KakaoAK " + REEST_API_KEY);
        HttpEntity httpEntity = new HttpEntity(httpHeaders);
        URI urlTemplate = UriComponentsBuilder.fromHttpUrl(HOST)
                .queryParam("query", keyword)
                .queryParam("page", page)
                .queryParam("size", size) // 세팅협의필요
                .encode()
                .build()
                .toUri();
        ResponseEntity<String> data = restTemplate.exchange(
                urlTemplate,
                HttpMethod.GET,
                httpEntity,
                String.class);
        return responseUtil.responseToJson(data);
    }

    @Override
    public Map<String, Object> getLikeReview(String memberIdx, String address) {
        List<LikeSpot> likeList = likeSpotService.findByMemberIdxAndAddress(memberIdx, address);
        List<Review> reviewList = reviewService.findByMemberIdxAndAddress(memberIdx, address);
        Map<String, Object> map = new HashMap<>();
        map.put("like", likeList);
        map.put("review", reviewList);

        return map;
    }

}
