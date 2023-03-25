package com.example.demo.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.FileService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("file")
@Slf4j
public class FileController {

    @Autowired
    FileService service;

    @PostMapping("")
    public ResponseEntity<ResponseDTO> saveImg(@RequestParam("file") MultipartFile file,
            @RequestParam("boardName") String boardName) {
        log.info("사진 저장");
        return service.save(file, boardName);
    }

    @DeleteMapping("")
    public ResponseEntity<ResponseDTO> deleteImg(String idx) {
        return service.delete(idx);
    }

    @GetMapping("/img/review/{fileName}")
    public ResponseEntity<Resource> getReviewImage(@PathVariable("fileName") String fileName) throws IOException {
        log.info("get image file[Review]");
        return service.getFile("review", fileName);
    }

    @GetMapping("/img/schedule/{fileName}")
    public ResponseEntity<Resource> getSchduleImage(@PathVariable("fileName") String fileName) throws IOException {
        log.info("get image file[Schedule]");
        return service.getFile("schedule", fileName);
    }
}
