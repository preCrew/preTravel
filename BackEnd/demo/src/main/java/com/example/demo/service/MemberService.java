package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.ResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.dto.Member;


@Service
public interface MemberService {

    List<Member> findAll();

    List<Member> findByEmail(String email);

    void save(Member mem);


    ResponseEntity<ResponseDTO> findMyPageData(String code);


}
