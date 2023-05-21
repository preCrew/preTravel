package com.example.demo.dto;

import lombok.Data;

import java.util.Map;

@Data
public class KakaoAccount {
    private Boolean profile_needs_agreement;
    private Boolean profile_nickname_needs_agreement;
    private Boolean profile_image_needs_agreement;
    private Map<String, Object> profile;
    private Boolean name_needs_agreement;
    private String name;
    private Boolean email_needs_agreement;
    private Boolean is_email_valid;
    private Boolean is_email_verified;
    private String email;
    private Boolean age_range_needs_agreement;
    private String age_range;
    private Boolean birthyear_needs_agreement;
    private String birthyear;
    private Boolean birthday_needs_agreement;
    private String birthday;
    private String birthday_type;
    private Boolean gender_needs_agreement;
    private String gender;
    private Boolean phone_number_needs_agreement;
    private String phone_number;
}
