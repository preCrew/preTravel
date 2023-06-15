package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.Member;


@Service
public interface MemberService {

    List<Member> findAll();

    List<Member> findByEmail(String email);

    void save(Member mem);

    Map<String, Object> findByIdx(String code);


}
