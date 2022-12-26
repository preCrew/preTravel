package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Map;
import com.example.demo.service.MemberService;

@RestController
@RequestMapping("map")
public class MapController {
    
    @Autowired
    private MemberService service;

    @GetMapping("")
    public String findAll(Map map) {
        System.out.println(map);
        return "hello";
    }

}
