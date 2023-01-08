package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class KakaoTokenResponse {
    private String access_token;
    private String token_type;
    private String refresh_token;
    private Integer expires_in;
    private String scope;
    private Integer refresh_token_expires_in;
}
