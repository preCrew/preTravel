package com.example.demo.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class ResponseUtil {
    
    public JSONObject responseToJson(ResponseEntity<String> target) {
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
