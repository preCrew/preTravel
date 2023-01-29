package com.example.demo.entity;

import com.example.demo.dto.Member;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "schedule_t")
@Getter
@Setter
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sct_num")
    private long num;

    @Column(name = "sct_name")
    private String name;

    @Column(name = "sct_start_date")
    private Timestamp startDate;

    @Column(name = "sct_end_date")
    private Timestamp endDate;

    @Column(name = "create_date")
    private Timestamp createDate;

    @Column(name = "modify_date")
    private Timestamp modifyDate;

    @ManyToOne
    @JoinColumn(name = "idx")
    private Member member;
}
