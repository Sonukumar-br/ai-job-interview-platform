package com.app.interview.service;

import com.app.interview.dto.SkillGapRequestDTO;
import com.app.interview.dto.SkillGapResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final AIService aiService;

    private static final List<String> SUPPORTED_ROLES = List.of(
            "Java Full Stack Developer",
            "Java Backend Developer",
            "Frontend Developer",
            "Software Engineer"
    );

    public SkillService(AIService aiService) {
        this.aiService = aiService;
    }

    public SkillGapResponseDTO analyzeSkillGap(SkillGapRequestDTO requestDTO) {
        String targetRole = requestDTO.getTargetRole();
        if (targetRole == null || targetRole.trim().isEmpty()) {
            throw new IllegalArgumentException("Target job role cannot be empty");
        }

        String trimmedRole = targetRole.trim();

        // Delegate skill gap comparison to AIService
        return aiService.analyzeSkillGap(trimmedRole, requestDTO.getResumeSkills());
    }
}
