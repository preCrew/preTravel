package com.example.demo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dto.File;
import com.example.demo.repository.FileRepository;

@Component
public class FileDao {

    @Autowired
    FileRepository repository;

    public File save(File file) {
        return repository.save(file);
    }

    public Optional<File> findById(String idx) {
        return repository.findById(Long.valueOf(idx));
    }

    public void deleteById(String idx) {
        repository.deleteById(Long.valueOf(idx));
    }

    public List<File> findByBoardNameAndBoardIdx(String boardName, Long idx) {
        return repository.findByBoardNameAndBoardIdx(boardName, idx);
    }

}
