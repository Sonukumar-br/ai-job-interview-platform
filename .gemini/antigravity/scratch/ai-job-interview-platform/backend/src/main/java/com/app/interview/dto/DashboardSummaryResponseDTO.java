package com.app.interview.dto;

import java.util.List;

public class DashboardSummaryResponseDTO {

    private long totalInterviews;
    private double averageScore;
    private double bestScore;
    private boolean resumeAnalyzed;
    private String targetRole;
    private List<RecentInterviewDTO> recentInterviews;
    private List<TopicPerformanceDTO> topicPerformance;
    private List<String> strongTopics;
    private List<String> weakTopics;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> recommendedTopics;
    private List<String> learningPlan;

    public DashboardSummaryResponseDTO() {
    }

    public DashboardSummaryResponseDTO(long totalInterviews, double averageScore, double bestScore,
                                       boolean resumeAnalyzed, String targetRole,
                                       List<RecentInterviewDTO> recentInterviews,
                                       List<TopicPerformanceDTO> topicPerformance,
                                       List<String> strongTopics, List<String> weakTopics,
                                       List<String> matchedSkills, List<String> missingSkills,
                                       List<String> recommendedTopics, List<String> learningPlan) {
        this.totalInterviews = totalInterviews;
        this.averageScore = averageScore;
        this.bestScore = bestScore;
        this.resumeAnalyzed = resumeAnalyzed;
        this.targetRole = targetRole;
        this.recentInterviews = recentInterviews;
        this.topicPerformance = topicPerformance;
        this.strongTopics = strongTopics;
        this.weakTopics = weakTopics;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.recommendedTopics = recommendedTopics;
        this.learningPlan = learningPlan;
    }

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public void setTotalInterviews(long totalInterviews) {
        this.totalInterviews = totalInterviews;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public double getBestScore() {
        return bestScore;
    }

    public void setBestScore(double bestScore) {
        this.bestScore = bestScore;
    }

    public boolean isResumeAnalyzed() {
        return resumeAnalyzed;
    }

    public void setResumeAnalyzed(boolean resumeAnalyzed) {
        this.resumeAnalyzed = resumeAnalyzed;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public List<RecentInterviewDTO> getRecentInterviews() {
        return recentInterviews;
    }

    public void setRecentInterviews(List<RecentInterviewDTO> recentInterviews) {
        this.recentInterviews = recentInterviews;
    }

    public List<TopicPerformanceDTO> getTopicPerformance() {
        return topicPerformance;
    }

    public void setTopicPerformance(List<TopicPerformanceDTO> topicPerformance) {
        this.topicPerformance = topicPerformance;
    }

    public List<String> getStrongTopics() {
        return strongTopics;
    }

    public void setStrongTopics(List<String> strongTopics) {
        this.strongTopics = strongTopics;
    }

    public List<String> getWeakTopics() {
        return weakTopics;
    }

    public void setWeakTopics(List<String> weakTopics) {
        this.weakTopics = weakTopics;
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
