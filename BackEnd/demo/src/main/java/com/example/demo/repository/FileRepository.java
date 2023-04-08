package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.File;

public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findByBoardNameAndBoardIdx(String boardName, Long idx);

}
