package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.Member;
import com.example.demo.dto.ResponseDTO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NaverService {

    @Value("${oauth.naver.client_id}")
    private String CLIENT_ID;

    @Value("${oauth.naver.client_secret}")
    private String CLIENT_SECRET;

    @Autowired
    MemberService memberService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    HttpHeaders httphHeaders;

    public ResponseEntity<ResponseDTO> login(String code, String state) {
        log.info("네이버 로그인 code : {}, state : {}", code, state);
        JSONObject token = getToken(code, state);
        String accessToken = (String) token.get("access_token");
        log.info("네이버 로그인 토그정보 : {}", token.toString());
        JSONObject profile = getProfile(accessToken, (String) token.get("refresh_token"));
        log.info("프로필 정보 {}", profile);
        JSONObject profileJo = (JSONObject) profile.get("response");
        String email = (String) profileJo.get("email");

        if (email == null || email.isEmpty() || email.isBlank()) {
            return ResponseEntity
                    .ok()
                    .body(ResponseDTO.builder()
                            .code(200)
                            .msg("로그인 실패")
                            .data("")
                            .build());
        }
        if (memberService.findByEmail(email).isEmpty()) {
            memberService.save(Member.builder().id((String) profileJo.get("id")).name((String) profileJo.get("name"))
                    .email(email).build());
        }
        ResponseCookie cookie = ResponseCookie.from("refreshToken", (String) token.get("refresh_token"))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60)
                .build();

        Map<String, String> data = new HashMap<>();
        data.put("accessToken", accessToken);

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("로그인 성공")
                        .data(data)
                        .build());
    }

    private JSONObject getProfile(String accessToken, String refreshToken) {
        httphHeaders = new HttpHeaders();
        httphHeaders.add("Authorization", "Bearer " + accessToken);
        httphHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        restTemplate = new RestTemplate();
        HttpEntity httpEntity = new HttpEntity(httphHeaders);
        ResponseEntity<String> profileData = restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                httpEntity,
                String.class);
        return ResponseToJson(profileData);
    }

    private JSONObject getToken(String code, String state) {
        httphHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", CLIENT_ID);
        params.add("client_secret", CLIENT_SECRET);
        params.add("code", code);
        params.add("state", state);
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(params,
                httphHeaders);

        // 토큰얻기
        ResponseEntity<String> data = restTemplate.exchange("https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                httpEntity,
                String.class);
        return ResponseToJson(data);
    }

    private JSONObject ResponseToJson(ResponseEntity<String> target) {
        JSONObject jo = new JSONObject();
        try {
            JSONParser jsonParser = new JSONParser();
            jo = (JSONObject) jsonParser.parse(target.getBody());
        } catch (Exception e) {
            e.printStackTrace();
            log.info("ResponseToJson Parsing Error");
        }
        return jo;
    }

}
