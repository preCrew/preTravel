package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.LocationDao;
import com.example.demo.dto.Location;
import com.example.demo.service.LocationService;

@Service
public class ILocationService implements LocationService{

    @Autowired
    LocationDao dao;

    @Override
    public List<Location> searchAll(String keyword) {
        return dao.searchAll(keyword);
    }
}
