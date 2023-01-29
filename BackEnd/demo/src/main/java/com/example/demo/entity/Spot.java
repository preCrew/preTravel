package com.example.demo.entity;

import com.example.demo.dto.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "spot_t")
@Getter
@Setter
public class Spot {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "spt_num")
    private Long num;

    @Column(name = "spt_seq")
    private Long sequence;

    @Column(name = "spt_subject")
    private String subject;

    @Column(name = "spt_score")
    private int score;

    @Column(name = "spt_content")
    private String content;

    @Column(name = "spt_like_spot")
    private Character like;

    @Column(name = "spt_main_picture")
    private Long mainPictureNumber;

    @Column(name = "spt_revisit")
    private Character revisit;

    @Column(name = "create_date")
    private Timestamp createDate;

    @Column(name = "modify_date")
    private Timestamp modifyDate;

    @ManyToOne
    @JoinColumn(name = "idx")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "pt_num")
    private Period period;  // 기간
}
