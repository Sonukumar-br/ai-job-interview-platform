package com.app.interview.dto;

import java.time.LocalDateTime;

public class InterviewSummaryDTO {

    private Long id;
    private String topic;
    private String difficulty;
    private String question;
    private Integer score;
    private LocalDateTime createdAt;

    public InterviewSummaryDTO() {
    }

    public InterviewSummaryDTO(Long id, String topic, String difficulty, String question, Integer score, LocalDateTime createdAt) {
        this.id = id;
        this.topic = topic;
        this.difficulty = difficulty;
        this.question = question;
        this.score = score;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
