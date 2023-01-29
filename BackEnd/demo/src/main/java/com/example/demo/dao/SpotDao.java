package com.example.demo.dao;

import com.example.demo.entity.Spot;
import com.example.demo.repository.SpotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Component
public class SpotDao {

    @Autowired
    SpotRepository repository;

    public List<Spot> searchByMemberIdxAndPeriodNum(long memberIdx, long periodNum) {
        return repository.findByMemberIdxAndPeriodNum(memberIdx, periodNum);
    }

    public Optional<Spot> searchByNum(long num) {
        return Optional.empty();
    }

    public Collection<Spot> searchAll() {
        return null;
    }

    @Transactional
    public int save(Spot spot) {
        return 0;
    }
}
