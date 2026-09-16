package com.app.interview.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class InterviewRequestDTO {

    @NotBlank(message = "Topic cannot be empty")
    @Size(max = 100, message = "Topic cannot exceed 100 characters")
    private String topic;

    @NotBlank(message = "Difficulty level cannot be empty")
    @Size(max = 50, message = "Difficulty cannot exceed 50 characters")
    private String difficulty;

    public InterviewRequestDTO() {
    }

    public InterviewRequestDTO(String topic, String difficulty) {
        this.topic = topic;
        this.difficulty = difficulty;
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
}
