package com.example.demo.util;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.example.demo.dto.ResponseDTO;

@Component
public class ReturnUtil {

        public ResponseEntity<ResponseDTO> code400(String msg) {
                return ResponseEntity
                                .ok()
                                .body(ResponseDTO.builder()
                                                .code(400)
                                                .msg(msg)
                                                .data("")
                                                .build());
        }

        public ResponseEntity<ResponseDTO> code200(String msg, Object obj) {
                return ResponseEntity
                                .ok()
                                .body(ResponseDTO.builder()
                                                .code(200)
                                                .msg(msg)
                                                .data(obj)
                                                .build());
        }

        public ResponseEntity<ResponseDTO> code500(String msg) {
                return ResponseEntity
                                .ok()
                                .body(ResponseDTO.builder()
                                                .code(400)
                                                .msg(msg)
                                                .data("")
                                                .build());
        }

}
