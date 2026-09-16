package com.app.interview.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class SkillGapRequestDTO {

    @NotBlank(message = "Target job role cannot be empty")
    @Size(max = 100, message = "Target role cannot exceed 100 characters")
    private String targetRole;

    private List<String> resumeSkills;

    public SkillGapRequestDTO() {
    }

    public SkillGapRequestDTO(String targetRole, List<String> resumeSkills) {
        this.targetRole = targetRole;
        this.resumeSkills = resumeSkills;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public List<String> getResumeSkills() {
        return resumeSkills;
    }

    public void setResumeSkills(List<String> resumeSkills) {
        this.resumeSkills = resumeSkills;
    }
}
