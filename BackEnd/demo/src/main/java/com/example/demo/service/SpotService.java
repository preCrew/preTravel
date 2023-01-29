package com.example.demo.service;

import com.example.demo.dto.SpotRequestDTO;
import com.example.demo.entity.Spot;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SpotService {

    List<Spot> findByMemberIdxAndPeriodNum(long memberIdx, long periodNum);

    void addSpotWithSpotRequestAndMemberEmail(SpotRequestDTO request, String email);
}
