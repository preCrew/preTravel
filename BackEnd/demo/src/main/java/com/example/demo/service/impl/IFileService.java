package com.example.demo.service.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.FileDao;
import com.example.demo.dto.File;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.FileService;
import com.example.demo.util.ReturnUtil;

@Service
public class IFileService implements FileService {

    @Autowired
    ReturnUtil returnUtil;

    @Autowired
    FileDao dao;

    @Value("${file.dir}")
    private String DIR;

    @Override
    public ResponseEntity<ResponseDTO> save(MultipartFile file, String boardName) {
        if (boardName == null ||
                !(boardName.equals("review") || boardName.equals("schedule"))) {
            return returnUtil.code400("boardName이 올바르지 않습니다.");
        }

        try {
            File saveFile = dao.save(
                    new File(null,
                            boardName,
                            null,
                            null,
                            null));
            String fileName = saveFile.getIdx() + "_" + file.getOriginalFilename();
            DIR = DIR
                    + boardName + "/"
                    + fileName;
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/main/resources/img/"
                    + boardName + "/"
                    + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, bytes);

            File resultFile = dao.save(
                    new File(saveFile.getIdx(),
                            boardName,
                            null,
                            DIR,
                            fileName));
            return returnUtil.code200("파일저장 성공", resultFile);
        } catch (Exception e) {
            e.printStackTrace();
            return returnUtil.code400("파일저장 실패");
        }
    }

    @Override
    public ResponseEntity<Resource> getFile(String boardName, String fileName) {
        try {
            ClassPathResource classPathResource = new ClassPathResource("");
            String path = classPathResource.getFile().getAbsolutePath();
            System.out.println("path : " + path);

            ClassPathResource classPathResource2 = new ClassPathResource("img/"
                    + boardName + "/"
                    + fileName);
            String path2 = classPathResource2.getFile().getAbsolutePath();
            System.out.println("path2 : " + path2);
        } catch (Exception e) {
            // e.printStackTrace();
        }
        Resource resource = new ClassPathResource("img/"
                + boardName + "/"
                + fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ResponseDTO> delete(String idx) {
        Optional<File> optFile = dao.findById(idx);
        if (optFile.isEmpty()) {
            return returnUtil.code200("인덱스를 확인하세요", "");
        } else {
            File file = optFile.get();
            String fileName = file.getFileName();
            Path path = Paths.get("src/main/resources/img/"
                    + file.getBoardName() + "/"
                    + fileName);

            if (Files.exists(path)) {
                try {
                    Files.delete(path);
                } catch (Exception e) {
                    return returnUtil.code500("파일삭제 실패");
                }
            } else {
                return returnUtil.code400("파일이 존재하지 않습니다.");
            }

            dao.deleteById(idx);
            return returnUtil.code200("파일삭제성공", "");
        }
    }
}