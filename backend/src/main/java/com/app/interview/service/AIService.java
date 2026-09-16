package com.app.interview.service;

import com.app.interview.dto.InterviewEvaluationResponseDTO;
import com.app.interview.dto.ResumeAnalysisResponseDTO;
import com.app.interview.dto.SkillGapResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIService {

    private static final Logger logger = LoggerFactory.getLogger(AIService.class);

    @Value("${app.ai.api-key}")
    private String apiKey;

    @Value("${app.ai.model}")
    private String model;

    @Value("${app.ai.api-url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public AIService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public String generateQuestion(String topic, String difficulty) {
        String prompt = String.format(
                "You are an expert technical interviewer. Generate EXACTLY ONE clear, conceptual, and practical technical interview question for a candidate. " +
                "Topic: %s. Difficulty Level: %s. Output ONLY the raw question text.",
                topic, difficulty
        );

        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("YOUR_GEMINI_API_KEY")) {
            logger.warn("Gemini API Key missing. Using fallback question.");
            return getFallbackQuestion(topic, difficulty);
        }

        try {
            String rawResponse = callGeminiApi(prompt);
            if (rawResponse != null && !rawResponse.trim().isEmpty()) {
                return rawResponse.trim();
            }
        } catch (Exception e) {
            logger.error("Error communicating with Gemini AI API: {}. Using fallback question.", e.getClass().getSimpleName());
        }

        return getFallbackQuestion(topic, difficulty);
    }

    public InterviewEvaluationResponseDTO evaluateAnswer(String question, String answer, String topic) {
        String prompt = String.format(
                "You are a strict technical interviewer evaluating a job candidate's answer.\n" +
                "Technical Topic: %s\n" +
                "Question: %s\n" +
                "Candidate's Answer: %s\n\n" +
                "Evaluate the answer strictly based on technical accuracy, completeness, and correctness. Do NOT give high scores for keyword matching alone.\n" +
                "Provide your evaluation ONLY in raw JSON format with NO markdown wrapping (` ```json ` or ` ``` `) and NO additional text before or after the JSON.\n" +
                "The JSON must have the following exact schema:\n" +
                "{\n" +
                "  \"score\": <integer from 0 to 10>,\n" +
                "  \"correctness\": \"<1-2 sentence overview of correctness>\",\n" +
                "  \"strengths\": [\"<strength 1>\", \"<strength 2>\"],\n" +
                "  \"improvements\": [\"<area for improvement 1>\", \"<area for improvement 2>\"],\n" +
                "  \"idealAnswer\": \"<clear, comprehensive sample model answer>\"\n" +
                "}",
                topic, question, answer
        );

        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("YOUR_GEMINI_API_KEY")) {
            logger.warn("Gemini API Key missing. Using fallback evaluation.");
            return getFallbackEvaluation(question, answer, topic);
        }

        try {
            String rawResponse = callGeminiApi(prompt);
            if (rawResponse != null && !rawResponse.trim().isEmpty()) {
                InterviewEvaluationResponseDTO parsedResponse = parseEvaluationJson(rawResponse);
                if (parsedResponse != null) {
                    return parsedResponse;
                }
            }
        } catch (Exception e) {
            logger.error("Error evaluating answer with Gemini AI: {}. Using fallback evaluation.", e.getClass().getSimpleName());
        }

        return getFallbackEvaluation(question, answer, topic);
    }

    public ResumeAnalysisResponseDTO analyzeResume(String resumeText) {
        String prompt = String.format(
                "You are an expert AI Resume Reviewer and Technical Recruiter. Analyze the following candidate resume text:\n\n" +
                "%s\n\n" +
                "Extract and categorize technical profile details ONLY in raw JSON format with NO markdown wrapping (` ```json ` or ` ``` `) and NO additional text.\n" +
                "The JSON must follow this exact schema:\n" +
                "{\n" +
                "  \"summary\": \"<Concise 2-3 sentence overview of candidate profile and experience>\",\n" +
                "  \"skills\": [\"<Skill 1>\", \"<Skill 2>\"],\n" +
                "  \"strengths\": [\"<Strength 1>\", \"<Strength 2>\"],\n" +
                "  \"missingSkills\": [\"<Industry standard skill missing for full stack / backend role 1>\", \"<Skill 2>\"],\n" +
                "  \"projects\": [\"<Project name & key technology highlights 1>\"],\n" +
                "  \"education\": [\"<Degree, Institution, Year if present>\"],\n" +
                "  \"suggestions\": [\"<Actionable resume impact improvement advice 1>\", \"<Advice 2>\"]\n" +
                "}",
                resumeText
        );

        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("YOUR_GEMINI_API_KEY")) {
            logger.warn("Gemini API Key missing. Using fallback resume analysis.");
            return getFallbackResumeAnalysis(resumeText);
        }

        try {
            String rawResponse = callGeminiApi(prompt);
            if (rawResponse != null && !rawResponse.trim().isEmpty()) {
                ResumeAnalysisResponseDTO parsedResponse = parseResumeJson(rawResponse);
                if (parsedResponse != null) {
                    return parsedResponse;
                }
            }
        } catch (Exception e) {
            logger.error("Error analyzing resume with Gemini AI: {}. Using fallback analysis.", e.getClass().getSimpleName());
        }

        return getFallbackResumeAnalysis(resumeText);
    }

    public SkillGapResponseDTO analyzeSkillGap(String targetRole, List<String> candidateSkills) {
        String skillsString = (candidateSkills != null && !candidateSkills.isEmpty()) 
                ? String.join(", ", candidateSkills) 
                : "Java, Spring Boot, React, MySQL, REST APIs";

        String prompt = String.format(
                "You are a Senior Tech Lead and Engineering Hiring Manager. Perform a strict Skill Gap Analysis comparing a candidate's current technical skills with standard industry requirements for the Target Job Role.\n\n" +
                "Target Job Role: %s\n" +
                "Candidate's Current Skills: %s\n\n" +
                "Provide your skill gap analysis ONLY in raw JSON format with NO markdown wrapping (` ```json ` or ` ``` `) and NO additional text.\n" +
                "The JSON must match the following exact schema:\n" +
                "{\n" +
                "  \"targetRole\": \"%s\",\n" +
                "  \"matchedSkills\": [\"<skill present in candidate resume matching role>\"],\n" +
                "  \"missingSkills\": [\"<essential industry skill missing for role>\"],\n" +
                "  \"recommendedSkills\": [\"<high priority skills to acquire next>\"],\n" +
                "  \"recommendedTopics\": [\"<specific technical interview study topic 1>\"],\n" +
                "  \"learningPlan\": [\"<step 1 learning action item>\", \"<step 2 action item>\"]\n" +
                "}",
                targetRole, skillsString, targetRole
        );

        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("YOUR_GEMINI_API_KEY")) {
            logger.warn("Gemini API Key missing. Using fallback skill gap analysis.");
            return getFallbackSkillGapAnalysis(targetRole, candidateSkills);
        }

        try {
            String rawResponse = callGeminiApi(prompt);
            if (rawResponse != null && !rawResponse.trim().isEmpty()) {
                SkillGapResponseDTO parsedResponse = parseSkillGapJson(rawResponse, targetRole);
                if (parsedResponse != null) {
                    return parsedResponse;
                }
            }
        } catch (Exception e) {
            logger.error("Error performing Skill Gap Analysis with Gemini AI: {}. Using fallback analysis.", e.getClass().getSimpleName());
        }

        return getFallbackSkillGapAnalysis(targetRole, candidateSkills);
    }

    public Map<String, List<String>> generateRoleMatchRecommendations(String targetRole, List<String> matchedSkills,
                                                                      List<String> missingSkills, List<String> strongTopics,
                                                                      List<String> weakTopics) {
        String prompt = String.format(
                "You are an AI Tech Career Advisor. Generate personalized job match recommendations for a candidate targeting role: %s.\n" +
                "Matched Skills: %s\n" +
                "Missing Required Skills: %s\n" +
                "Interview Strong Topics: %s\n" +
                "Interview Weak/Unpracticed Topics: %s\n\n" +
                "Provide your output ONLY in raw JSON format with NO markdown wrapping (` ```json ` or ` ``` `) and NO additional text.\n" +
                "The JSON must match this exact schema:\n" +
                "{\n" +
                "  \"recommendations\": [\"<personalized career advice 1>\", \"<advice 2>\"],\n" +
                "  \"learningPlan\": [\"<step 1 learning item>\", \"<step 2 item>\"],\n" +
                "  \"projectIdeas\": [\"<practical real-world project idea incorporating missing skills 1>\", \"<project idea 2>\"]\n" +
                "}",
                targetRole,
                matchedSkills != null ? String.join(", ", matchedSkills) : "Java, Spring Boot",
                missingSkills != null ? String.join(", ", missingSkills) : "Docker, Microservices",
                strongTopics != null ? String.join(", ", strongTopics) : "Java, SQL",
                weakTopics != null ? String.join(", ", weakTopics) : "System Design, DSA"
        );

        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.contains("YOUR_GEMINI_API_KEY")) {
            logger.warn("Gemini API Key missing. Using fallback role match recommendations.");
            return getFallbackRoleMatchRecommendations(targetRole, missingSkills);
        }

        try {
            String rawResponse = callGeminiApi(prompt);
            if (rawResponse != null && !rawResponse.trim().isEmpty()) {
                String cleanJson = cleanJsonString(rawResponse);
                JsonNode root = objectMapper.readTree(cleanJson);

                List<String> recs = extractStringList(root, "recommendations");
                List<String> plan = extractStringList(root, "learningPlan");
                List<String> projects = extractStringList(root, "projectIdeas");

                Map<String, List<String>> res = new HashMap<>();
                res.put("recommendations", recs);
                res.put("learningPlan", plan);
                res.put("projectIdeas", projects);
                return res;
            }
        } catch (Exception e) {
            logger.error("Error generating role match recommendations with Gemini AI: {}. Using fallback recommendations.", e.getClass().getSimpleName());
        }

        return getFallbackRoleMatchRecommendations(targetRole, missingSkills);
    }

    private String callGeminiApi(String prompt) throws Exception {
        String fullUrl = String.format("%s/%s:generateContent?key=%s", apiUrl, model, apiKey);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> textPart = Map.of("text", prompt);
        Map<String, Object> contentsObj = Map.of("parts", List.of(textPart));
        Map<String, Object> requestBody = Map.of("contents", List.of(contentsObj));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List candidates = (List) response.getBody().get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map firstCandidate = (Map) candidates.get(0);
                    Map content = (Map) firstCandidate.get("content");
                    List parts = (List) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return (String) ((Map) parts.get(0)).get("text");
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Gemini AI API call failed with exception: {}", e.getClass().getSimpleName());
            throw e;
        }

        return null;
    }

    private InterviewEvaluationResponseDTO parseEvaluationJson(String rawText) {
        try {
            String cleanJson = cleanJsonString(rawText);
            JsonNode root = objectMapper.readTree(cleanJson);

            int score = root.path("score").asInt(7);
            score = Math.max(0, Math.min(10, score));

            String correctness = root.path("correctness").asText("The answer covers key concepts.");
            List<String> strengths = extractStringList(root, "strengths");
            List<String> improvements = extractStringList(root, "improvements");
            String idealAnswer = root.path("idealAnswer").asText("A comprehensive answer defines core concepts and trade-offs.");

            return new InterviewEvaluationResponseDTO(score, correctness, strengths, improvements, idealAnswer);
        } catch (Exception e) {
            logger.error("Failed to parse AI evaluation JSON: {}", e.getMessage());
            return null;
        }
    }

    private ResumeAnalysisResponseDTO parseResumeJson(String rawText) {
        try {
            String cleanJson = cleanJsonString(rawText);
            JsonNode root = objectMapper.readTree(cleanJson);

            String summary = root.path("summary").asText("Candidate resume processed successfully with technical background.");
            List<String> skills = extractStringList(root, "skills");
            List<String> strengths = extractStringList(root, "strengths");
            List<String> missingSkills = extractStringList(root, "missingSkills");
            List<String> projects = extractStringList(root, "projects");
            List<String> education = extractStringList(root, "education");
            List<String> suggestions = extractStringList(root, "suggestions");

            return new ResumeAnalysisResponseDTO(summary, skills, strengths, missingSkills, projects, education, suggestions);
        } catch (Exception e) {
            logger.error("Failed to parse AI resume analysis JSON: {}", e.getMessage());
            return null;
        }
    }

    private SkillGapResponseDTO parseSkillGapJson(String rawText, String defaultRole) {
        try {
            String cleanJson = cleanJsonString(rawText);
            JsonNode root = objectMapper.readTree(cleanJson);

            String targetRole = root.path("targetRole").asText(defaultRole);
            List<String> matchedSkills = extractStringList(root, "matchedSkills");
            List<String> missingSkills = extractStringList(root, "missingSkills");
            List<String> recommendedSkills = extractStringList(root, "recommendedSkills");
            List<String> recommendedTopics = extractStringList(root, "recommendedTopics");
            List<String> learningPlan = extractStringList(root, "learningPlan");

            return new SkillGapResponseDTO(targetRole, matchedSkills, missingSkills, recommendedSkills, recommendedTopics, learningPlan);
        } catch (Exception e) {
            logger.error("Failed to parse AI skill gap JSON: {}", e.getMessage());
            return null;
        }
    }

    private String cleanJsonString(String rawText) {
        String cleanJson = rawText.trim();
        if (cleanJson.startsWith("```json")) {
            cleanJson = cleanJson.substring(7);
        } else if (cleanJson.startsWith("```")) {
            cleanJson = cleanJson.substring(3);
        }
        if (cleanJson.endsWith("```")) {
            cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
        }
        return cleanJson.trim();
    }

    private List<String> extractStringList(JsonNode root, String fieldName) {
        List<String> list = new ArrayList<>();
        if (root.has(fieldName) && root.get(fieldName).isArray()) {
            root.get(fieldName).forEach(node -> list.add(node.asText()));
        }
        return list;
    }

    private String getFallbackQuestion(String topic, String difficulty) {
        if (topic.toLowerCase().contains("java")) {
            return "Explain the difference between HashMap and ConcurrentHashMap in Java. How does ConcurrentHashMap achieve thread safety without locking the entire table?";
        }
        return String.format("Explain the core concepts, common design patterns, and best practices associated with %s at a %s level.", topic, difficulty);
    }

    private InterviewEvaluationResponseDTO getFallbackEvaluation(String question, String answer, String topic) {
        int length = answer.trim().length();
        int score = length > 100 ? 8 : (length > 30 ? 6 : 4);
        return new InterviewEvaluationResponseDTO(
                score,
                "The response covers essential aspects of the question with good baseline understanding.",
                List.of("Answer directly addresses " + topic, "Identifies core concepts"),
                List.of("Consider elaborating on practical real-world edge cases", "Include precise code snippets"),
                "A comprehensive answer defines the concept, compares trade-offs, and provides practical code examples."
        );
    }

    private ResumeAnalysisResponseDTO getFallbackResumeAnalysis(String resumeText) {
        return new ResumeAnalysisResponseDTO(
                "Software Engineering candidate with hands-on experience in full-stack web development and core backend architectures.",
                List.of("Java 21", "Spring Boot", "React.js", "MySQL", "REST APIs", "Git"),
                List.of("Clear technical skill set demonstrated in project experience", "Solid foundation in modern backend & frontend frameworks"),
                List.of("Docker & Kubernetes Containerization", "CI/CD Pipeline Automation", "Distributed Caching (Redis)"),
                List.of("AI Mock Interview Platform - Full Stack Spring Boot & React Application", "E-Commerce Microservices Engine"),
                List.of("Bachelor of Technology in Computer Science & Engineering"),
                List.of("Quantify project impact metrics (e.g., 'Improved API response time by 40%')", "Add system design and cloud architecture certifications")
        );
    }

    private SkillGapResponseDTO getFallbackSkillGapAnalysis(String targetRole, List<String> candidateSkills) {
        List<String> matched = (candidateSkills != null && !candidateSkills.isEmpty()) 
                ? candidateSkills 
                : List.of("Java", "Spring Boot", "React", "MySQL");

        List<String> missing = List.of("Spring Security & JWT", "Docker Containerization", "Microservices Design Patterns");
        List<String> recommendedTopics = List.of("JWT Authentication Flow", "REST API Security Best Practices", "Docker Basics & Compose", "Microservices Communication");
        List<String> learningPlan = List.of(
                "1. Master Spring Security fundamentals and JWT token filter chains",
                "2. Learn Docker containerization basics and write multi-stage Dockerfiles",
                "3. Study Microservices architecture patterns (API Gateway, Service Discovery, Resiliency)"
        );

        return new SkillGapResponseDTO(
                targetRole,
                matched,
                missing,
                missing,
                recommendedTopics,
                learningPlan
        );
    }

    private Map<String, List<String>> getFallbackRoleMatchRecommendations(String targetRole, List<String> missingSkills) {
        List<String> recs = List.of(
                "Focus on mastering missing core skills for " + targetRole + " to increase interview callback rates.",
                "Practice technical interview questions in topics where average score is currently below 7.0."
        );

        List<String> plan = List.of(
                "1. Complete a dedicated hands-on tutorial for " + (missingSkills != null && !missingSkills.isEmpty() ? missingSkills.get(0) : "Spring Security & Docker"),
                "2. Practice 5 mock interview questions on the platform for your weaker topics",
                "3. Build a portfolio project incorporating the missing technical skills"
        );

        List<String> projects = List.of(
                "Build a Production-Ready Microservices Application with Spring Boot, Docker, and React Frontend",
                "Implement a JWT Authenticated REST API with Rate Limiting and MySQL Persistence"
        );

        Map<String, List<String>> map = new HashMap<>();
        map.put("recommendations", recs);
        map.put("learningPlan", plan);
        map.put("projectIdeas", projects);
        return map;
    }
}
