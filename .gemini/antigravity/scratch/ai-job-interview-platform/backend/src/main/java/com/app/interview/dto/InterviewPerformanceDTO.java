package com.app.interview.dto;

import java.util.List;

public class InterviewPerformanceDTO {

    private long totalInterviews;
    private double averageScore;
    private List<String> strongTopics;
    private List<String> weakTopics;

    public InterviewPerformanceDTO() {
    }

    public InterviewPerformanceDTO(long totalInterviews, double averageScore, List<String> strongTopics, List<String> weakTopics) {
        this.totalInterviews = totalInterviews;
        this.averageScore = averageScore;
        this.strongTopics = strongTopics;
        this.weakTopics = weakTopics;
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
}
