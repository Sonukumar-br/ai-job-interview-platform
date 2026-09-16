package com.app.interview.dto;

import java.util.List;

public class InterviewEvaluationResponseDTO {

    private int score;
    private String correctness;
    private List<String> strengths;
    private List<String> improvements;
    private String idealAnswer;

    public InterviewEvaluationResponseDTO() {
    }

    public InterviewEvaluationResponseDTO(int score, String correctness, List<String> strengths,
                                          List<String> improvements, String idealAnswer) {
        this.score = score;
        this.correctness = correctness;
        this.strengths = strengths;
        this.improvements = improvements;
        this.idealAnswer = idealAnswer;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
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
}
