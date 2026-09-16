package com.app.interview.dto;

import java.time.LocalDateTime;
import java.util.List;

public class InterviewDetailDTO {

    private Long id;
    private String topic;
    private String difficulty;
    private String question;
    private String userAnswer;
    private Integer score;
    private String correctness;
    private List<String> strengths;
    private List<String> improvements;
    private String idealAnswer;
    private LocalDateTime createdAt;

    public InterviewDetailDTO() {
    }

    public InterviewDetailDTO(Long id, String topic, String difficulty, String question, String userAnswer,
                              Integer score, String correctness, List<String> strengths,
                              List<String> improvements, String idealAnswer, LocalDateTime createdAt) {
        this.id = id;
        this.topic = topic;
        this.difficulty = difficulty;
        this.question = question;
        this.userAnswer = userAnswer;
        this.score = score;
        this.correctness = correctness;
        this.strengths = strengths;
        this.improvements = improvements;
        this.idealAnswer = idealAnswer;
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

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
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

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getImprovements() {
        return improvements;
    }

    public void setImprovements(List<String> improvements) {
        this.improvements = improvements;
    }

    public String getIdealAnswer() {
        return idealAnswer;
    }

    public void setIdealAnswer(String idealAnswer) {
        this.idealAnswer = idealAnswer;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
