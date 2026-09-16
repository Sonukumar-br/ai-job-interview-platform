package com.app.interview.dto;

public class QuestionResponseDTO {

    private String question;
    private String topic;
    private String difficulty;

    public QuestionResponseDTO() {
    }

    public QuestionResponseDTO(String question, String topic, String difficulty) {
        this.question = question;
        this.topic = topic;
        this.difficulty = difficulty;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
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
