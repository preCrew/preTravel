package com.example.demo.controller;

import com.example.demo.dto.KakaoTokenResponse;
import com.example.demo.dto.KakaoUserInfoResponse;
import com.example.demo.dto.ResponseDTO;
import com.example.demo.service.KaKaoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("oauth")
@Slf4j
public class SSOLoginController {

    KaKaoService kaKaoService;

    @Autowired
    public SSOLoginController(KaKaoService kaKaoService) {
        this.kaKaoService = kaKaoService;
    }

    @Description("회원이 소셜 로그인을 마치면 자동으로 실행되는 API입니다. 인가 코드를 이용해 토큰을 받고, 해당 토큰으로 사용자 정보를 조회합니다." +
            "사용자 정보를 이용하여 서비스에 회원가입합니다.")
    @GetMapping("/kakao")
    @ResponseBody
    public ResponseEntity<ResponseDTO> kakaoOauth(@RequestParam("code") String code) {
        return kaKaoService.login(code);
    }
}
