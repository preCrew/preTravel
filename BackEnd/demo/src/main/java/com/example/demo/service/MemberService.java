package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Member;


@Service
public interface MemberService {

    List<Member> findAll();

    List<Member> findByEmail(String email);

    void save(Member mem);


}
