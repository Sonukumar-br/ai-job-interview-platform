package com.app.interview.dto;

import java.time.LocalDateTime;

public class RecentInterviewDTO {

    private Long id;
    private String topic;
    private String difficulty;
    private Integer score;
    private String correctness;
    private String question;
    private LocalDateTime createdAt;

    public RecentInterviewDTO() {
    }

    public RecentInterviewDTO(Long id, String topic, String difficulty, Integer score, String correctness, String question, LocalDateTime createdAt) {
        this.id = id;
        this.topic = topic;
        this.difficulty = difficulty;
        this.score = score;
        this.correctness = correctness;
        this.question = question;
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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getCorrectness() {
        return correctness;
    }

    public void setCorrectness(String correctness) {
        this.correctness = correctness;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
