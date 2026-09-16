package com.app.interview.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class InterviewEvaluationRequestDTO {

    @NotBlank(message = "Question cannot be empty")
    @Size(max = 2000, message = "Question cannot exceed 2000 characters")
    private String question;

    @NotBlank(message = "Answer cannot be empty")
    @Size(max = 10000, message = "Answer cannot exceed 10000 characters")
    private String answer;

    @NotBlank(message = "Topic cannot be empty")
    @Size(max = 100, message = "Topic cannot exceed 100 characters")
    private String topic;

    @Size(max = 50, message = "Difficulty cannot exceed 50 characters")
    private String difficulty;

    public InterviewEvaluationRequestDTO() {
    }

    public InterviewEvaluationRequestDTO(String question, String answer, String topic, String difficulty) {
        this.question = question;
        this.answer = answer;
        this.topic = topic;
        this.difficulty = difficulty;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
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
