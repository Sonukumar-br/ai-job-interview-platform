package com.app.interview.dto;

import java.util.List;

public class JobRoleMatchResponseDTO {

    private String roleId;
    private String roleName;
    private int matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private InterviewPerformanceDTO interviewPerformance;
    private List<String> recommendations;
    private List<String> learningPlan;
    private List<String> projectIdeas;

    public JobRoleMatchResponseDTO() {
    }

    public JobRoleMatchResponseDTO(String roleId, String roleName, int matchPercentage,
                                   List<String> matchedSkills, List<String> missingSkills,
                                   InterviewPerformanceDTO interviewPerformance,
                                   List<String> recommendations, List<String> learningPlan,
                                   List<String> projectIdeas) {
        this.roleId = roleId;
        this.roleName = roleName;
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.interviewPerformance = interviewPerformance;
        this.recommendations = recommendations;
        this.learningPlan = learningPlan;
        this.projectIdeas = projectIdeas;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public int getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(int matchPercentage) {
        this.matchPercentage = matchPercentage;
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

    public InterviewPerformanceDTO getInterviewPerformance() {
        return interviewPerformance;
    }

    public void setInterviewPerformance(InterviewPerformanceDTO interviewPerformance) {
        this.interviewPerformance = interviewPerformance;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }

    public List<String> getLearningPlan() {
        return learningPlan;
    }

    public void setLearningPlan(List<String> learningPlan) {
        this.learningPlan = learningPlan;
    }

    public List<String> getProjectIdeas() {
        return projectIdeas;
    }

    public void setProjectIdeas(List<String> projectIdeas) {
        this.projectIdeas = projectIdeas;
    }
}
