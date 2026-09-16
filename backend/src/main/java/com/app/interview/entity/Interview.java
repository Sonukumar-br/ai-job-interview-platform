package com.app.interview.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String topic;

    @Column(nullable = false, length = 50)
    private String difficulty;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String userAnswer;

    @Column(nullable = false)
    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String correctness;

    @ElementCollection
    @CollectionTable(name = "interview_strengths", joinColumns = @JoinColumn(name = "interview_id"))
    @Column(name = "strength", columnDefinition = "TEXT")
    private List<String> strengths = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "interview_improvements", joinColumns = @JoinColumn(name = "interview_id"))
    @Column(name = "improvement", columnDefinition = "TEXT")
    private List<String> improvements = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String idealAnswer;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Interview() {
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
