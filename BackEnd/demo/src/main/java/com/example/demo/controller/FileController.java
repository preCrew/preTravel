package com.example.demo.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.util.ReturnUtil;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("upload")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class FileController {

    @Autowired
    private ReturnUtil returnUtil;

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveImg(@RequestParam("file") MultipartFile file,
            @RequestParam("boardName") String boardName,  HttpServletRequest request) {
        log.info("사진 저장");
        System.out.println(file);
        System.out.println(boardName);

        if (boardName == null ||
                !(boardName.equals("review") || boardName.equals("schedule"))) {
            return returnUtil.code400("board name이 올바르지 않습니다.");
        }

        try {


            // Path currentDir = Path.of("");
            // System.out.println("Current directory: " + currentDir.toAbsolutePath());
            // byte[] bytes = file.getBytes();
            // Path path = Paths.get(currentDir + File.separator + file.getOriginalFilename());
            // Files.write(path, bytes);


            /**
             * 그럼 원래에서 경로를 못잡은거네 backend - frontend 같이 있으니까?
             * 결국에는 ==> backend 있는 디렉터리만 실행시켜 줘야 되는구나 .. ! 
             * 왜 ??
             * 왜 ??
             * ....
             * 일단 담배한대피고 테스트해보자
             */
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/main/resources/img/" + file.getOriginalFilename());
            Files.createDirectories(path.getParent());
            Files.write(path, bytes);
            return returnUtil.code200("파일저장 성공", "");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return returnUtil.code200("찜한장소 저장", "");
    }
}
