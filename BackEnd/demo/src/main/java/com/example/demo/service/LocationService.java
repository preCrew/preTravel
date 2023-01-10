package com.example.demo.service;

import java.util.Map;
import java.util.List;

import org.springframework.stereotype.Service;

// import com.example.demo.entity.Map;

@Service
public interface LocationService {

    List<Map<String, String>> searchAll(String keyword);

}
