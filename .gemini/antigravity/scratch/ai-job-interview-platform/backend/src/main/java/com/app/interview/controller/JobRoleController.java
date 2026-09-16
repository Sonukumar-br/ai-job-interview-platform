package com.app.interview.controller;

import com.app.interview.dto.JobRoleDTO;
import com.app.interview.dto.JobRoleMatchRequestDTO;
import com.app.interview.dto.JobRoleMatchResponseDTO;
import com.app.interview.service.JobRoleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-roles")
public class JobRoleController {

    private final JobRoleService jobRoleService;

    public JobRoleController(JobRoleService jobRoleService) {
        this.jobRoleService = jobRoleService;
    }

    @GetMapping
    public ResponseEntity<List<JobRoleDTO>> getAvailableJobRoles() {
        List<JobRoleDTO> roles = jobRoleService.getAvailableJobRoles();
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/match")
    public ResponseEntity<JobRoleMatchResponseDTO> matchJobRole(@Valid @RequestBody JobRoleMatchRequestDTO requestDTO,
                                                                 Authentication authentication) {
        String userEmail = authentication.getName();
        JobRoleMatchResponseDTO response = jobRoleService.matchJobRole(requestDTO, userEmail);
        return ResponseEntity.ok(response);
    }
}
