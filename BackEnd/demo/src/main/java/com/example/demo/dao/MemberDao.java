package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dto.Member;
import com.example.demo.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;

@Component
public class MemberDao {

    @Autowired
    MemberRepository repository;

    public List<Member> findAll() {
        return repository.findAll();
    }

    public List<Member> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Member findByIdx(String idx) {
        return repository.findByIdx(Long.valueOf(idx));
    }

    @Transactional
    public void save(Member mem) {
        repository.save(mem);
    }    
}
