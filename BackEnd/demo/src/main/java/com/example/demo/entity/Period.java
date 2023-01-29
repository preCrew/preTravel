package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "period_t")
@Getter
@Setter
public class Period {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "pt_num")
    private long num;

    @Column(name = "pt_date")
    private Timestamp date;

    @Column(name = "create_date")
    private Timestamp createDate;

    @Column(name = "modify_date")
    private Timestamp modifyDate;

    @ManyToOne
    @JoinColumn(name = "sct_num")
    private Schedule schedule;

}
