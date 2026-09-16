package com.app.interview.controller;

import com.app.interview.dto.DashboardSummaryResponseDTO;
import com.app.interview.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponseDTO> getDashboardSummary(Authentication authentication) {
        String userEmail = authentication.getName();
        DashboardSummaryResponseDTO summary = dashboardService.getDashboardSummary(userEmail);
        return ResponseEntity.ok(summary);
    }
}
