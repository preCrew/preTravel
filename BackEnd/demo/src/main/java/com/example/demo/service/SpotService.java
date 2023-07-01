package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Spot;

@Service
public interface SpotService {

    Map<String, Object> findBySctIdx(String sctIdx);

    Map<String, Object> save(Map<String, Object> map) throws Exception;

    void deleteBySctIdx(Long idx);

    List<Spot> findByNameAndLatitudeAndLongitude(Map<String, Object> map);

}
