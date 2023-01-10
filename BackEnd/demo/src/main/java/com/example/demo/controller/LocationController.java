package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.LocationService;

@RestController
@RequestMapping("map")
public class LocationController {

    @Autowired
    private LocationService service;

    @GetMapping("")
    public String searchAll(String keyword) {
        List<Map<String, String>> list = service.searchAll(keyword);
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("code", 200);
        resultMap.put("msg", "검색결과");
        resultMap.put("data", list.toString());
        JSONObject resultJo = new JSONObject(resultMap);

        return resultJo.toString();
    }

    // @GetMapping("")
    // public String findAll(Map map) {
    // System.out.println(map);
    // return "hello";
    // }

}
