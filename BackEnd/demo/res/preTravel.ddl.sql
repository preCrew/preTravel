CREATE DATABASE schedule;
USE schedule;

CREATE TABLE member_t(
   idx INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   mt_id VARCHAR(255),
   mt_pw VARCHAR(255),
   mt_email VARCHAR(255)
)