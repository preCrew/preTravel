package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name = "spot_t")
public class Spot {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    Long idx;

    @Column(name="sct_idx")
    String sctIdx;

    @Column(name="spt_seq")
    Integer seq;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name="spt_day", updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate day;

    @Column(name="spt_name")
    String name;

    @Column(name="spt_address")
    String address;

    @Column(name="spt_latitude")
    String latitude;

    @Column(name="spt_longitude")
    String longitude;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name="create_date", updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDateTime createDate;

    @PrePersist
    protected void prePersist() {
        createDate = LocalDateTime.now();
    }
  
}
