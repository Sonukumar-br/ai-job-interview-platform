package com.app.interview.service;

import com.app.interview.config.JobRoleConfig;
import com.app.interview.dto.InterviewPerformanceDTO;
import com.app.interview.dto.JobRoleMatchResponseDTO;
import com.app.interview.entity.Interview;
import com.app.interview.entity.User;
import com.app.interview.exception.ResourceNotFoundException;
import com.app.interview.repository.InterviewRepository;
import com.app.interview.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SkillMatchingService {

    private final JobRoleConfig jobRoleConfig;
    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;
    private final AIService aiService;

    public SkillMatchingService(JobRoleConfig jobRoleConfig, InterviewRepository interviewRepository,
                                UserRepository userRepository, AIService aiService) {
        this.jobRoleConfig = jobRoleConfig;
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }

    @Transactional(readOnly = true)
    public JobRoleMatchResponseDTO calculateJobRoleMatch(String roleId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        JobRoleConfig.RoleDefinition roleDef = jobRoleConfig.getRoleDefinition(roleId);

        // 1. Fetch Real Database Interview History for authenticated user
        List<Interview> userInterviews = interviewRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        InterviewPerformanceDTO performanceDTO = calculateInterviewPerformance(userInterviews, roleDef.getRequiredSkills());

        // 2. Candidate Skills Collection (Default candidate baseline + topics practiced)
        Set<String> candidateSkills = getCandidateSkills(userInterviews);

        // 3. Deterministic Case-Insensitive Skill Matching Logic
        List<String> requiredSkills = roleDef.getRequiredSkills();
        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        Set<String> normalizedCandidateSkills = candidateSkills.stream()
                .map(s -> s.toLowerCase().trim())
                .collect(Collectors.toSet());

        for (String req : requiredSkills) {
            String normReq = req.toLowerCase().trim();
            boolean isMatched = normalizedCandidateSkills.stream().anyMatch(cand ->
                    cand.equals(normReq) || cand.contains(normReq) || normReq.contains(cand));

            if (isMatched) {
                matchedSkills.add(req);
            } else {
                missingSkills.add(req);
            }
        }

        int matchPercentage = requiredSkills.isEmpty() ? 0 : (int) Math.round(((double) matchedSkills.size() / requiredSkills.size()) * 100);

        // 4. Enrich with AI Contextual Recommendations (Fail-safe)
        Map<String, List<String>> aiEnrichment = aiService.generateRoleMatchRecommendations(
                roleDef.getName(),
                matchedSkills,
                missingSkills,
                performanceDTO.getStrongTopics(),
                performanceDTO.getWeakTopics()
        );

        List<String> recommendations = aiEnrichment.getOrDefault("recommendations", List.of());
        List<String> learningPlan = aiEnrichment.getOrDefault("learningPlan", List.of());
        List<String> projectIdeas = aiEnrichment.getOrDefault("projectIdeas", List.of());

        return new JobRoleMatchResponseDTO(
                roleDef.getId(),
                roleDef.getName(),
                matchPercentage,
                matchedSkills,
                missingSkills,
                performanceDTO,
                recommendations,
                learningPlan,
                projectIdeas
        );
    }

    private InterviewPerformanceDTO calculateInterviewPerformance(List<Interview> userInterviews, List<String> roleRequiredSkills) {
        if (userInterviews == null || userInterviews.isEmpty()) {
            List<String> weakTopics = roleRequiredSkills.stream().limit(4).collect(Collectors.toList());
            return new InterviewPerformanceDTO(0, 0.0, List.of(), weakTopics);
        }

        long totalCount = userInterviews.size();
        double sum = userInterviews.stream().mapToInt(Interview::getScore).sum();
        double avg = Math.round((sum / totalCount) * 10.0) / 10.0;

        Map<String, List<Integer>> topicScores = new HashMap<>();
        for (Interview inv : userInterviews) {
            String topic = inv.getTopic();
            topicScores.computeIfAbsent(topic, k -> new ArrayList<>()).add(inv.getScore());
        }

        List<String> strongTopics = new ArrayList<>();
        List<String> weakTopics = new ArrayList<>();

        for (Map.Entry<String, List<Integer>> entry : topicScores.entrySet()) {
            double topicAvg = entry.getValue().stream().mapToInt(Integer::intValue).average().orElse(0.0);
            if (topicAvg >= 7.0) {
                strongTopics.add(entry.getKey());
            } else {
                weakTopics.add(entry.getKey());
            }
        }

        // Include required skills not practiced yet into weak topics
        for (String req : roleRequiredSkills) {
            if (!topicScores.containsKey(req) && weakTopics.size() < 5) {
                weakTopics.add(req);
            }
        }

        return new InterviewPerformanceDTO(totalCount, avg, strongTopics, weakTopics);
    }

    private Set<String> getCandidateSkills(List<Interview> userInterviews) {
        Set<String> set = new HashSet<>(List.of("Java", "Spring Boot", "React", "MySQL", "REST API", "SQL", "Git", "HTML", "CSS", "JavaScript"));
        if (userInterviews != null) {
            userInterviews.forEach(i -> set.add(i.getTopic()));
        }
        return set;
    }
}
