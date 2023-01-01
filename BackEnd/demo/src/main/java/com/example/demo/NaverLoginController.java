package com.example.demo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entity.Member;
import com.example.demo.service.MemberService;

@RestController
// @RequestMapping("naver")
public class NaverLoginController {

    @Autowired
    private MemberService service;


    /**
     * 
     * 로그인 요청주소 retrun
     */
    @GetMapping("/login") 
    public String redirectUrl(){
        String url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=76Nr2e2G6KuBeyuVPqbf&state=STATE_STRING&redirect_uri=http://localhost:8080/oauth/redirect_url";
        Map<String, Object> map = new HashMap<>();
        map.put("data",  url);
        map.put("code", "200");
        map.put("msg", "로그인 url");
        JSONObject resultJo = new JSONObject(map);
        return resultJo.toString();
    }
   
/**
 * 로그인처리실패했을때 고민이 좀 필요함.
 * findBy + 속성이름
 * 여기서 '속성이름' 이란 entity에서 내가 '변수명' 으로 설정한 이름  !! 
 * 
 * @param code
 * @param state
 * @return
 */
    @GetMapping("/oauth/redirect_url")
	public ResponseEntity<String> authNaver(@RequestParam String code, @RequestParam String state) {
			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders httphHeaders = new HttpHeaders();
            httphHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code");
            params.add("client_id", "76Nr2e2G6KuBeyuVPqbf");
            params.add("client_secret","3FuWrNGOQZ");
            params.add("code", code);
            params.add("state", state);
            HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<MultiValueMap<String,String>>(params, httphHeaders);

            // 토큰얻기
            ResponseEntity<String> data = restTemplate.exchange("https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                httpEntity,
                String.class
            );

            /**
             * 결과를 JSON 객체로 만듦 
             */
            JSONObject jo = new JSONObject();
            try {
                JSONParser jsonParser = new JSONParser();
                jo = (JSONObject) jsonParser.parse(data.getBody());
            } catch (ParseException e) {
                e.printStackTrace();
                return null;
            }

            /**
             * 토큰으로 profile정보얻기
             */
            String accessToken = (String) jo.get("access_token");
            String refreshToken = (String) jo.get("refresh_token");

            httphHeaders = new HttpHeaders();
            httphHeaders.add("Authorization", "Bearer "+accessToken);
            httphHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            restTemplate = new RestTemplate();
            httpEntity = new HttpEntity<>(httphHeaders);

            ResponseEntity<String> profileData = restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST, 
                httpEntity, 
                String.class
                );            

            /**
             * 프로필 정보를 JSON 객체로 만듦
             */
            JSONObject profileJo;
            try {
                JSONParser jsonParser = new JSONParser();
                profileJo = (JSONObject) jsonParser.parse(profileData.getBody());
            } catch (ParseException e) {
                e.printStackTrace();
                return null;
            }

            JSONObject tmpJo = (JSONObject) profileJo.get("response");
            List<Member> list = service.findByEmail((String) tmpJo.get("email")); //이거는 되는 코드 !!
            Member mem = new Member(null, (String) tmpJo.get("id"), (String) tmpJo.get("name"), (String) tmpJo.get("email"));

            if (list == null || list.size() == 0) {
                service.save(mem);
            }

            HashMap<String, Object> map = new HashMap<>();
            map.put("code", 200);
            map.put("msg", "로그인 성공");
            map.put("data", mem);
            map.put("accessToken", accessToken);
            JSONObject resultJo = new JSONObject(map);
            System.out.println(accessToken);
            System.out.println(refreshToken);
            ResponseCookie cookie = ResponseCookie.from("refreshToken",refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60)
                // .domain("http://localhost:8080/") <<-- 이거 어캐 해야함 ?>?
                .build();
            

            return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(resultJo.toString());
        }

    }
    
/**
 * 
 * 에러나는지 test 결과 
 * 아래 세개 메서드 모두 에러발생 
 */
    // List<Member> list = service.findByMt_email((String) tmpJo.get("email")); 
    // List<Member> list2 = service.findByMt_Email((String) tmpJo.get("email"));
    // List<Member> list3 = service.findBymt_email((String) tmpJo.get("email"));

    // findBymt_email(java.lang.String)! No property 'mt' found for type 'Member' Did you mean ''id''
    //Failed to create query for method public abstract java.util.List com.example.demo.repository.MemberRepository.findByMt_Email(java.lang.String)! No property 'mt' found for type 'Member' Did you mean ''id''
    //Failed to create query for method public abstract java.util.List com.example.demo.repository.MemberRepository.findByMt_email(java.lang.String)! No property 'mt' found for type 'Member' Did you mean ''id''