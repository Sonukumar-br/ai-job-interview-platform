package com.app.interview.controller;

import com.app.interview.dto.HealthResponseDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public HealthResponseDTO checkHealth() {
        return new HealthResponseDTO("UP", "AI Job Preparation API is active and healthy");
    }
}
