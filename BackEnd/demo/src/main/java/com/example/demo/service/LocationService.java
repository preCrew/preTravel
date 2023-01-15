package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Location;


@Service
public interface LocationService {

    List<Location> searchAll(String keyword);

}
