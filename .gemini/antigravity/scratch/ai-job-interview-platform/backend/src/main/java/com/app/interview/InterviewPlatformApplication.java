package com.app.interview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InterviewPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(InterviewPlatformApplication.class, args);
        System.out.println("==================================================");
        System.out.println(" AI Job Preparation Backend Started Successfully! ");
        System.out.println(" Server running on: http://localhost:8080         ");
        System.out.println("==================================================");
    }
}
