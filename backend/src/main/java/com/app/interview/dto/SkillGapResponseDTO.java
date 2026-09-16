package com.app.interview.dto;

import java.util.List;

public class SkillGapResponseDTO {

    private String targetRole;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> recommendedSkills;
    private List<String> recommendedTopics;
    private List<String> learningPlan;

    public SkillGapResponseDTO() {
    }

    public SkillGapResponseDTO(String targetRole, List<String> matchedSkills, List<String> missingSkills,
                               List<String> recommendedSkills, List<String> recommendedTopics,
                               List<String> learningPlan) {
        this.targetRole = targetRole;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.recommendedSkills = recommendedSkills;
        this.recommendedTopics = recommendedTopics;
        this.learningPlan = learningPlan;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getRecommendedSkills() {
        return recommendedSkills;
    }

    public void setRecommendedSkills(List<String> recommendedSkills) {
        this.recommendedSkills = recommendedSkills;
    }

    public List<String> getRecommendedTopics() {
        return recommendedTopics;
    }

    public void setRecommendedTopics(List<String> recommendedTopics) {
        this.recommendedTopics = recommendedTopics;
    }

    public List<String> getLearningPlan() {
        return learningPlan;
    }

    public void setLearningPlan(List<String> learningPlan) {
        this.learningPlan = learningPlan;
    }
}
