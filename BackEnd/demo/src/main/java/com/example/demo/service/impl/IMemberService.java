package com.example.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;
import com.example.demo.entity.Member;
import com.example.demo.service.MemberService;

@Service
public class IMemberService implements MemberService{

    @Autowired
    MemberDao dao;

    @Override
    public List<Member> findAll() {
        List<Member> list = dao.findAll();
        return list;
    }

    @Override
    public List<Member> findByEmail(String email) {
        return dao.findByEmail(email);
    }

    @Override
    public void save(Member mem) {
        dao.save(mem);
    }

}
