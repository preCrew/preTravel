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

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class IFileService implements FileService {

    @Autowired
    ReturnUtil returnUtil;

    @Autowired
    FileDao dao;

    @Override
    public ResponseEntity<ResponseDTO> save(MultipartFile file, String boardName) {
        if (boardName == null ||
                !(boardName.equals("review") || boardName.equals("schedule"))) {
            return returnUtil.code400("boardName이 올바르지 않습니다.");
        }
        // String dir = "http://localhost:8080/file/img/";
        String dir = "https://port-0-pretravel-ll32glc6adwo3.gksl2.cloudtype.app/file/img/";
        try {
            File saveFile = dao.save(
                    new File(null,
                            boardName,
                            null,
                            null,
                            null));
            String fileName = saveFile.getIdx() + "_" + file.getOriginalFilename();
            dir = dir
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
                            dir,
                            fileName));
            return returnUtil.code200("파일저장 성공", resultFile);
        } catch (Exception e) {
            e.printStackTrace();
            return returnUtil.code400("파일저장 실패");
        }
    }

    @Override
    public ResponseEntity<Resource> getFile(String boardName, String fileName) {
        log.info("file service impl");
        try {
            ClassPathResource classPathResource = new ClassPathResource("");
            String path = classPathResource.getFile().getAbsolutePath();
            log.info("path : " + path);

            ClassPathResource classPathResource2 = new ClassPathResource("img/"
                    + boardName + "/"
                    + fileName);
            String path2 = classPathResource2.getFile().getAbsolutePath();
            log.info("path2 : " + path2);

        } catch (Exception e) {
            // e.printStackTrace();
        }
        log.info("file service impl22222");
        Resource resource = new ClassPathResource("img/"
                + boardName + "/"
                + fileName);
        log.info("file service impl33333");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        log.info("file service impl44444");
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