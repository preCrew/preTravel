package com.example.demo.controller;

import com.example.demo.dto.KakaoTokenResponse;
import com.example.demo.dto.KakaoUserInfoResponse;
import com.example.demo.service.KaKaoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Slf4j
public class KakaoController {

    @Autowired
    KaKaoService kaKaoService;

    @GetMapping("/loginForm")
    public String greeting() {
        return "loginForm";
    }

    @Description("회원이 소셜 로그인을 마치면 자동으로 실행되는 API입니다. 인가 코드를 이용해 토큰을 받고, 해당 토큰으로 사용자 정보를 조회합니다." +
            "사용자 정보를 이용하여 서비스에 회원가입합니다.")
    @GetMapping("/oauth")
    @ResponseBody
    public String kakaoOauth(@RequestParam("code") String code) {
        log.info("인가 코드를 이용하여 토큰을 받습니다.");
        KakaoTokenResponse response = kaKaoService.getKakaoTokenResponse(code);
        log.info("KakaoTokenResponse 대한 정보입니다. response: {}", response.toString());
        KakaoUserInfoResponse userInfo = kaKaoService.getKakaoUserInfo(response.getAccess_token());
        log.info("회원 정보 입니다. {}",userInfo);
        return "Okay";
    }

}
