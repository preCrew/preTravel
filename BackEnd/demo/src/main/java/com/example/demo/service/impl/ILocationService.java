package com.example.demo.service.impl;

import java.net.URI;
import java.util.List;

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
import com.example.demo.dto.Location;
import com.example.demo.service.LocationService;
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
    RestTemplate restTemplate;

    @Autowired
    ResponseUtil responseUtil;

    @Override
    public List<Location> searchAll(String keyword) {
        return dao.searchAll(keyword);
    }

    @Override
    public void searchPlace(String keyword) {
        /**
         * 회원검증
         */

        /**
         * 2. 카카오 api 검색하기 / 
         * 230123수정필요 : page, size 그냥 알아서 결정
         */
        JSONObject jo = getPlaceData(keyword);

        /**
         * 검색된 결과 검증과정
         * (지역이 맞는지)
         *          */
        System.out.println(jo);
    }

    private JSONObject getPlaceData(String keyword){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        httpHeaders.add("Authorization", "KakaoAK " + REEST_API_KEY);
        HttpEntity httpEntity = new HttpEntity(httpHeaders);
        URI urlTemplate = UriComponentsBuilder.fromHttpUrl(HOST)
                .queryParam("query", keyword)
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
    


}
