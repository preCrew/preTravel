package com.example.demo.service;

import com.example.demo.dto.KakaoTokenResponse;
import com.example.demo.dto.KakaoUserInfoResponse;
import com.example.demo.dto.Member;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.util.ResponseUtil;

import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Description;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class KaKaoService {

    @Value("${oauth.kakao.token_host}")
    private String TOKEN_HOST; // https://kauth.kakao.com/oauth/token

    @Value("${oauth.kakao.logout_host}")
    private String LOGOUT_HOST;

    @Value("${oauth.kakao.user_host}")
    private String USER_HOST; // https://kapi.kakao.com/v2/user/me

    @Value("${oauth.kakao.grant_type}")
    private String GRANT_TYPE; // authorization_code

    @Value("${oauth.kakao.rest_api_key}")
    private String REST_API_KEY; // REST_API_KEY 값

    @Value("${oauth.kakao.redirect_uri}")
    private String REDIRECT; // http://localhost:8080/oauth/kakao

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    MemberService memberService;

    @Autowired
    ResponseUtil responseUtil;

    @Description("카카오 Access Token 가져오기")
    private String getToken(String code) {
        String url = TOKEN_HOST
                + "?grant_type=" + GRANT_TYPE // 1. grant_type
                + "&client_id=" + REST_API_KEY // 2. client_id (rest_api_key)
                + "&redirect_uri=" + REDIRECT // 3. redirect_uri
                + "&code=" + code; // 4. code
        String accessToken = "";
        try {
            ResponseEntity<KakaoTokenResponse> response = restTemplate.getForEntity(url, KakaoTokenResponse.class);
            accessToken = response.getBody().getAccess_token();
        } catch (RestClientException e) {
            e.printStackTrace();
        }
        return accessToken;
    }

    @Description("카카오TokenResponse 가져오기")
    private KakaoTokenResponse getKakaoTokenResponse(String code) {
        String url = TOKEN_HOST
                + "?grant_type=" + GRANT_TYPE // 1. grant_type
                + "&client_id=" + REST_API_KEY // 2. client_id (rest_api_key)
                + "&redirect_uri=" + REDIRECT // 3. redirect_uri
                + "&code=" + code; // 4. code
        KakaoTokenResponse tokenResponse = null;
        try {
            ResponseEntity<KakaoTokenResponse> response = restTemplate.getForEntity(url, KakaoTokenResponse.class);
            tokenResponse = response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
        }
        return tokenResponse;
    }

    @Description("카카오 사용자 정보 가져오기")
    private KakaoUserInfoResponse getKakaoUserInfo(String accessToken) {
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
            ResponseEntity<KakaoUserInfoResponse> response = restTemplate.postForEntity(url, request,
                    KakaoUserInfoResponse.class);
            kakaoUserInfo = response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
        }
        return kakaoUserInfo;
    }

    @Description("카카오 로그인 하기")
    public ResponseEntity<ResponseDTO> login(String code) {
        log.info("카카오 로그인 합니다. code: {}", code);
        KakaoTokenResponse response = getKakaoTokenResponse(code);
        log.info("KakaoTokenResponse 대한 정보입니다. response: {}", response.toString());
        KakaoUserInfoResponse userInfo = getKakaoUserInfo(response.getAccess_token());
        log.info("회원 정보 입니다. {}", userInfo);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", response.getRefresh_token())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60)
                // .domain(WEB_HOST)
                .build();

        Map<String, String> data = new HashMap<>();
        data.put("accessToken", response.getAccess_token());
        String email = userInfo.getKakao_account().getEmail();

        if (email.isEmpty() || email.isBlank()) {
            return (ResponseEntity<ResponseDTO>) ResponseEntity.notFound();
        }

        List<Member> listMember = memberService.findByEmail(email);

        if (listMember.isEmpty()) {
            memberService.save(Member.builder().email(email).build());
        } else {
            // Last Access Time Update
        }

        data.put("memberIdx", listMember.get(0).getIdx().toString());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("로그인 성공")
                        .data(data)
                        .build());
    }

    public ResponseEntity<ResponseDTO> getAccessToken(String refreshToken) {
        log.info("카카오 AccessToken갱신 refreshToken : {}", refreshToken);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "refresh_token");
        params.add("client_id", REST_API_KEY);
        params.add("refresh_token", refreshToken);
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(
                params,
                httpHeaders);
        ResponseEntity<String> data = restTemplate.exchange(TOKEN_HOST,
                HttpMethod.POST,
                httpEntity,
                String.class);
        JSONObject token = responseUtil.responseToJson(data);
        String accessToken = (String) token.get("access_token");
        Map<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);

        return ResponseEntity
                .ok()
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("토큰갱신")
                        .data(result)
                        .build());
    }

    public ResponseEntity<Object> logout() {
        log.info("카카오 로그아웃 합니다.");
        return ResponseEntity
                .ok()
                .body(ResponseDTO.builder()
                        .code(200)
                        .msg("로그아웃 성공")
                        .data("")
                        .build());
    }
}
