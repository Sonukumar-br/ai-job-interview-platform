package com.app.interview.service;

import com.app.interview.config.JobRoleConfig;
import com.app.interview.dto.JobRoleDTO;
import com.app.interview.dto.JobRoleMatchRequestDTO;
import com.app.interview.dto.JobRoleMatchResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobRoleService {

    private final JobRoleConfig jobRoleConfig;
    private final SkillMatchingService skillMatchingService;

    public JobRoleService(JobRoleConfig jobRoleConfig, SkillMatchingService skillMatchingService) {
        this.jobRoleConfig = jobRoleConfig;
        this.skillMatchingService = skillMatchingService;
    }

    public List<JobRoleDTO> getAvailableJobRoles() {
        return jobRoleConfig.getAllRoles();
    }

    public JobRoleMatchResponseDTO matchJobRole(JobRoleMatchRequestDTO requestDTO, String userEmail) {
        return skillMatchingService.calculateJobRoleMatch(requestDTO.getRoleId(), userEmail);
    }
}
