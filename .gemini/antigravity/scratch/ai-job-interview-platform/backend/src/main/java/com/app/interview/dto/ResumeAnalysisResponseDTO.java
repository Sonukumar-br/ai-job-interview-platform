package com.app.interview.dto;

import java.util.List;

public class ResumeAnalysisResponseDTO {

    private String summary;
    private List<String> skills;
    private List<String> strengths;
    private List<String> missingSkills;
    private List<String> projects;
    private List<String> education;
    private List<String> suggestions;

    public ResumeAnalysisResponseDTO() {
    }

    public ResumeAnalysisResponseDTO(String summary, List<String> skills, List<String> strengths,
                                     List<String> missingSkills, List<String> projects,
                                     List<String> education, List<String> suggestions) {
        this.summary = summary;
        this.skills = skills;
        this.strengths = strengths;
        this.missingSkills = missingSkills;
        this.projects = projects;
        this.education = education;
        this.suggestions = suggestions;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getProjects() {
        return projects;
    }

    public void setProjects(List<String> projects) {
        this.projects = projects;
    }

    public List<String> getEducation() {
        return education;
    }

    public void setEducation(List<String> education) {
        this.education = education;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}
