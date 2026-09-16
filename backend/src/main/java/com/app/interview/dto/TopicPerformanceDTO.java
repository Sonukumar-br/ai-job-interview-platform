package com.app.interview.dto;

public class TopicPerformanceDTO {

    private String topic;
    private double averageScore;
    private int interviewCount;

    public TopicPerformanceDTO() {
    }

    public TopicPerformanceDTO(String topic, double averageScore, int interviewCount) {
        this.topic = topic;
        this.averageScore = averageScore;
        this.interviewCount = interviewCount;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public int getInterviewCount() {
        return interviewCount;
    }

    public void setInterviewCount(int interviewCount) {
        this.interviewCount = interviewCount;
    }
}
