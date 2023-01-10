package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDTO {
    private int code;
    private String msg;
    private Object data;
}
