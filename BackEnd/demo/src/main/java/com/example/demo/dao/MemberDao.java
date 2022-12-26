package com.example.demo.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;

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

    public void save(Member mem) {
        repository.save(mem);
    }    
}
