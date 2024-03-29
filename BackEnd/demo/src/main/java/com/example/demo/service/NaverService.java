package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
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
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.Member;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.util.ResponseUtil;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NaverService {

        @Value("${oauth.naver.client_id}")
        private String CLIENT_ID;

        @Value("${oauth.naver.client_secret}")
        private String CLIENT_SECRET;

        @Value("${oauth.naver.token_host}")
        private String TOKEN_HOST;

        @Value("${oauth.naver.user_host}")
        private String USER_HOST;

        @Value("${oauth.naver.logout_url}")
        private String LOGOUT;

        @Autowired
        MemberService memberService;

        @Autowired
        RestTemplate restTemplate;

        @Autowired
        ResponseUtil responseUtil;

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

                List<Member> listMember = memberService.findByEmail(email);

                if (listMember.isEmpty()) {
                        memberService.save(Member.builder().id((String) profileJo.get("id"))
                                        .name((String) profileJo.get("name"))
                                        .email(email).build());
                }

                ResponseCookie cookie = ResponseCookie.from("refreshToken", (String) token.get("refresh_token"))
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .domain(".gksl2.cloudtype.app")
                                .maxAge(60)
                                .build();

                Map<String, String> data = new HashMap<>();
                data.put("accessToken", accessToken);
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

        private JSONObject getProfile(String accessToken, String refreshToken) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Authorization", "Bearer " + accessToken);
                httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                restTemplate = new RestTemplate();
                HttpEntity httpEntity = new HttpEntity(httpHeaders);
                ResponseEntity<String> profileData = restTemplate.exchange(
                                USER_HOST,
                                HttpMethod.POST,
                                httpEntity,
                                String.class);
                return responseUtil.responseToJson(profileData);
        }

        private JSONObject getToken(String code, String state) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
                params.add("grant_type", "authorization_code");
                params.add("client_id", CLIENT_ID);
                params.add("client_secret", CLIENT_SECRET);
                params.add("code", code);
                params.add("state", state);
                HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(
                                params,
                                httpHeaders);

                // 토큰얻기
                ResponseEntity<String> data = restTemplate.exchange(TOKEN_HOST,
                                HttpMethod.POST,
                                httpEntity,
                                String.class);
                return responseUtil.responseToJson(data);
        }

        public ResponseEntity<ResponseDTO> getAccessToken(String refreshToken) {
                log.info("네이버 AccessToken갱신 refreshToken : {}", refreshToken);

                String accessToken = getRenewaledAccessToken(refreshToken);
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

        private String getRenewaledAccessToken(String refreshToken) {
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
                params.add("grant_type", "refresh_token");
                params.add("client_id", CLIENT_ID);
                params.add("client_secret", CLIENT_SECRET);
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
                return accessToken;
        }

        public ResponseEntity<ResponseDTO> logout(String refreshToken) {
                log.info("네이버 로그아웃 refreshToken : {}", refreshToken);

                // 토큰 검증과정 : accessToken 갱신
                String accessToken = getRenewaledAccessToken(refreshToken);

                if (StringUtils.isEmpty(refreshToken)) {
                        return ResponseEntity
                                        .ok()
                                        .body(ResponseDTO.builder()
                                                        .code(200)
                                                        .msg("로그아웃 성공")
                                                        .build());
                }

                // 쿠키 삭제
                ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                                .httpOnly(true)
                                .secure(true)
                                .path("/")
                                .domain(".gksl2.cloudtype.app")
                                .maxAge(60)
                                .build();

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
                params.add("grant_type", "delete");
                params.add("client_id", CLIENT_ID);
                params.add("client_secret", CLIENT_SECRET);
                params.add("access_token", accessToken);
                params.add("service_provider", "NAVER");
                HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String, String>>(
                                params,
                                httpHeaders);

                return ResponseEntity
                                .ok()
                                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                                .body(ResponseDTO.builder()
                                                .code(200)
                                                .msg("로그아웃 성공")
                                                .build());
        }
}
