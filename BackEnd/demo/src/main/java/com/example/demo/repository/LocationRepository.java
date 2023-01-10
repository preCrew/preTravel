package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Location;

public interface LocationRepository extends JpaRepository<Location, Long>{

    List<Location> findBySiContainingOrGuContainingOrDongContaining(String keyword, String keyword1, String keyword2);
}
