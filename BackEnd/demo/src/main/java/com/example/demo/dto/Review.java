package com.example.demo.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

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
@Table(name = "review_t")
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    Long idx;

    @Column(name="mt_idx")
    String memberIdx;

    @Column(name="r_name")
    String name;

    @Column(name="r_address")
    String address;

    @Column(name="r_star")
    Integer star;

    @Column(name="r_latitude")
    Integer latitude;

    @Column(name="r_longitude")
    Integer longitude;

    @Column(name="r_revisit")
    String revisit;

    @Column(name="r_contents")
    String contents;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name="r_create_date", updatable = false)
    LocalDateTime createDate;

    @PrePersist
    protected void prePersist() {
        createDate = LocalDateTime.now();
    }
  
}
