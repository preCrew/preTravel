package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dto.Location;
import com.example.demo.repository.LocationRepository;

@Component
public class LocationDao {

    @Autowired
    LocationRepository repository;

    public List<Location> searchAll(String keyword) {
        return repository.findBySiContainingOrGuContainingOrDongContaining(keyword, keyword, keyword);
    }
}
