package com.example.demo.dao;


import java.time.LocalDate;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.Spot;
import com.example.demo.repository.SpotRepository;

@Component
public class SpotDao {

    @Autowired
    SpotRepository repository;

    public List<Spot> findBySctIdx(String sctIdx) {
        return repository.findBySctIdx(sctIdx);
    }

    public Spot save(Spot spot){
        return repository.save(spot);
    }

    public void deleteByDayAndSctIdx(LocalDate day, String sctIdx) {
        repository.deleteByDayAndSctIdx(day, sctIdx);
    }

    @Transactional
    public void deleteBySctIdx(String sctIdx) {
        repository.deleteBySctIdx(sctIdx);
    }



}
