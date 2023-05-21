package com.example.demo.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface SpotService {

    Map<String, Object> findBySctIdx(String sctIdx);

    Map<String, Object> save(Map<String, Object> map) throws Exception;

    void deleteBySctIdx(Long idx);


}
