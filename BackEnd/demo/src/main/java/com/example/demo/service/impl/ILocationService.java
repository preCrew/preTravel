package com.example.demo.service.impl;

import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.LocationDao;
import com.example.demo.entity.Location;
import com.example.demo.service.LocationService;

@Service
public class ILocationService implements LocationService{

    @Autowired
    LocationDao dao;

    @Override
    public List<Map<String, String>> searchAll(String keyword) {
        List<Location> list = dao.searchAll(keyword);
        List<Map<String, String>> resultList = new ArrayList<>();
        for (Location location : list) {
            Map<String, String> map = new HashMap<>();
            map.put("si", location.getSi());
            map.put("gu", location.getGu());
            map.put("dong", location.getDong());
            map.put("latitude", location.getLatitude());
            map.put("longitude", location.getLongitude());
            resultList.add(map);
        }
        return resultList;
    }
}
