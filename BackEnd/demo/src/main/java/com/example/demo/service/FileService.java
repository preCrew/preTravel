package com.example.demo.service;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ResponseDTO;

@Service
public interface FileService {

    ResponseEntity<ResponseDTO> save(MultipartFile file, String boardName);

    ResponseEntity<Resource> getFile(String dir, String fileName);

    ResponseEntity<ResponseDTO> delete(String idx);

}
