package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        // .allowedOrigins("http://localhost:8080", "http://127.0.0.1:5500",
                        // "https://web-fronttest-ll32glc6adwo3.gksl2.cloudtype.app")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "DELETE", "PUT")
                        .allowCredentials(true)
                        .exposedHeaders("Set-Cookie")
                        // .allowedHeaders("application/json")
                        .maxAge(3600);
            }
        };
    }
}
