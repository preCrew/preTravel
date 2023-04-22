package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.Member;

public interface MemberRepository extends JpaRepository<Member, Long>{

    List<Member> findByEmail(String email);    
}
