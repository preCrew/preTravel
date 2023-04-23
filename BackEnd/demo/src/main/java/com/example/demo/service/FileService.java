package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.File;
import com.example.demo.dto.ResponseDTO;

@Service
public interface FileService {

    ResponseEntity<ResponseDTO> save(MultipartFile file, String boardName);

    ResponseEntity<Resource> getFile(String dir, String fileName);

    ResponseEntity<ResponseDTO> delete(String idx);

    Optional<File> findById(String fileIdx);

    File saveFile(File file);

    List<File> findByBoardNameAndBoardIdx(String boardName, Long idx);

}
