package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class SpotRequestDTO {
    private String subject;
    private String content;
    private int score;
//    private String file;
    private Character revisit;
    private Character like;
    private int periodNum;
}
