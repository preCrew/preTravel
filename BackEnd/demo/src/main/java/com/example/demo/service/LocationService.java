package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.Location;
import com.example.demo.dto.ResponseDTO;


@Service
public interface LocationService {

    List<Location> searchAll(String keyword);

    ResponseEntity<ResponseDTO> searchPlace(String keyword, String page);

}
