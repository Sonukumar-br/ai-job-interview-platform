package com.app.interview.dto;

import java.util.List;

public class DashboardStatsDTO {

    private long totalInterviews;
    private double avgScore;
    private int bestScore;
    private List<InterviewSummaryDTO> recentInterviews;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalInterviews, double avgScore, int bestScore, List<InterviewSummaryDTO> recentInterviews) {
        this.totalInterviews = totalInterviews;
        this.avgScore = avgScore;
        this.bestScore = bestScore;
        this.recentInterviews = recentInterviews;
    }

    public long getTotalInterviews() {
        return totalInterviews;
    }

    public void setTotalInterviews(long totalInterviews) {
        this.totalInterviews = totalInterviews;
    }

    public double getAvgScore() {
        return avgScore;
    }

    public void setAvgScore(double avgScore) {
        this.avgScore = avgScore;
    }

    public int getBestScore() {
        return bestScore;
    }

    public void setBestScore(int bestScore) {
        this.bestScore = bestScore;
    }

    public List<InterviewSummaryDTO> getRecentInterviews() {
        return recentInterviews;
    }

    public void setRecentInterviews(List<InterviewSummaryDTO> recentInterviews) {
        this.recentInterviews = recentInterviews;
    }
}
