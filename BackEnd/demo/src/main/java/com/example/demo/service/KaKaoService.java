package com.example.demo.service;

import com.example.demo.dto.KakaoTokenResponse;
import com.example.demo.dto.KakaoUserInfoResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Description;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;

@Service
@Slf4j
public class KaKaoService {

    @Value("${oauth.kakao.token_host}")
    private String TOKEN_HOST;  // https://kauth.kakao.com/oauth/token

    @Value("${oauth.kakao.user_host}")
    private String USER_HOST;   // https://kapi.kakao.com/v2/user/me

    @Value("${oauth.kakao.grant_type}")
    private String GRANT_TYPE;  // authorization_code

    @Value("${oauth.kakao.rest_api_key}")
    private String REST_API_KEY; // REST_API_KEY 값

    @Value("${oauth.kakao.redirect_uri}")
    private String REDIRECT;    // http://localhost:8080/oauth

    @Autowired
    RestTemplate restTemplate;

    @Description("카카오 Access Token 가져오기")
    public String getToken(String code) {
        String url = TOKEN_HOST
                + "?grant_type=" + GRANT_TYPE   // 1. grant_type
                + "&client_id=" + REST_API_KEY  // 2. client_id (rest_api_key)
                + "&redirect_uri=" + REDIRECT   // 3. redirect_uri
                + "&code=" + code;              // 4. code
        String accessToken = "";
        try {
            ResponseEntity<KakaoTokenResponse>  response = restTemplate.getForEntity(url, KakaoTokenResponse.class);
            accessToken = response.getBody().getAccess_token();
        } catch (RestClientException e) {
            e.printStackTrace();
        }
        return accessToken;
    }

    @Description("카카오TokenResponse 가져오기")
    public KakaoTokenResponse getKakaoTokenResponse(String code) {
        String url = TOKEN_HOST
                + "?grant_type=" + GRANT_TYPE   // 1. grant_type
                + "&client_id=" + REST_API_KEY  // 2. client_id (rest_api_key)
                + "&redirect_uri=" + REDIRECT   // 3. redirect_uri
                + "&code=" + code;              // 4. code
        KakaoTokenResponse tokenResponse = null;
        try {
            ResponseEntity<KakaoTokenResponse>  response = restTemplate.getForEntity(url, KakaoTokenResponse.class);
            tokenResponse = response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
        }
        return tokenResponse;
    }

    @Description("카카오 사용자 정보 가져오기")
    public KakaoUserInfoResponse getKakaoUserInfo(String accessToken) {
        // Header
        String url = USER_HOST;
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
         headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        // Body
        HashMap<String, ArrayList> param = new HashMap<>();
        ArrayList<String> propertyKeys = new ArrayList<>();
        KakaoUserInfoResponse kakaoUserInfo = null;
        try {
            // Request
            propertyKeys.add("\"kakao_account.email\"");
            // propertyKeys.add("\"properties.nickname\"");
            param.put("property_keys", propertyKeys);
            HttpEntity request = new HttpEntity(param.toString(), headers);
            // Response
            ResponseEntity<KakaoUserInfoResponse> response = restTemplate.postForEntity(url, request, KakaoUserInfoResponse.class);
            kakaoUserInfo = response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
        }
        return kakaoUserInfo;
    }
}
