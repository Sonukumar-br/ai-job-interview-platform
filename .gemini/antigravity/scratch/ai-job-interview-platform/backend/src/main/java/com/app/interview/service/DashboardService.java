package com.app.interview.service;

import com.app.interview.dto.*;
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
public class DashboardService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;
    private final SkillMatchingService skillMatchingService;

    public DashboardService(InterviewRepository interviewRepository,
                            UserRepository userRepository,
                            SkillMatchingService skillMatchingService) {
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
        this.skillMatchingService = skillMatchingService;
    }

    @Transactional(readOnly = true)
    public DashboardSummaryResponseDTO getDashboardSummary(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        Long userId = user.getId();
        List<Interview> userInterviews = interviewRepository.findByUserIdOrderByCreatedAtDesc(userId);

        long totalInterviews = userInterviews.size();
        double averageScore = 0.0;
        double bestScore = 0.0;

        if (totalInterviews > 0) {
            double sum = userInterviews.stream().mapToInt(Interview::getScore).sum();
            averageScore = Math.round((sum / totalInterviews) * 10.0) / 10.0;
            bestScore = userInterviews.stream().mapToInt(Interview::getScore).max().orElse(0);
        }

        // Recent 5 interviews
        List<RecentInterviewDTO> recentInterviews = userInterviews.stream()
                .limit(5)
                .map(inv -> new RecentInterviewDTO(
                        inv.getId(),
                        inv.getTopic(),
                        inv.getDifficulty(),
                        inv.getScore(),
                        inv.getCorrectness(),
                        inv.getQuestion(),
                        inv.getCreatedAt()
                ))
                .collect(Collectors.toList());

        // Topic performance calculation from real interviews
        Map<String, List<Integer>> topicMap = new HashMap<>();
        for (Interview inv : userInterviews) {
            topicMap.computeIfAbsent(inv.getTopic(), k -> new ArrayList<>()).add(inv.getScore());
        }

        List<TopicPerformanceDTO> topicPerformance = new ArrayList<>();
        List<String> strongTopics = new ArrayList<>();
        List<String> weakTopics = new ArrayList<>();

        for (Map.Entry<String, List<Integer>> entry : topicMap.entrySet()) {
            String topic = entry.getKey();
            List<Integer> scores = entry.getValue();
            int count = scores.size();
            double topicAvg = Math.round((scores.stream().mapToInt(Integer::intValue).average().orElse(0.0)) * 10.0) / 10.0;

            topicPerformance.add(new TopicPerformanceDTO(topic, topicAvg, count));

            if (topicAvg >= 7.0) {
                strongTopics.add(topic);
            } else {
                weakTopics.add(topic);
            }
        }

        // Sort topic performance by highest score first
        topicPerformance.sort((a, b) -> Double.compare(b.getAverageScore(), a.getAverageScore()));

        // Job Role & Skill Matching data for default target role
        JobRoleMatchResponseDTO jobMatch = null;
        try {
            jobMatch = skillMatchingService.calculateJobRoleMatch("java-fullstack", userEmail);
        } catch (Exception e) {
            // Safe fallback if calculation fails
        }

        String targetRole = (jobMatch != null) ? jobMatch.getRoleName() : "Java Full Stack Developer";
        List<String> matchedSkills = (jobMatch != null && jobMatch.getMatchedSkills() != null) ? jobMatch.getMatchedSkills() : List.of();
        List<String> missingSkills = (jobMatch != null && jobMatch.getMissingSkills() != null) ? jobMatch.getMissingSkills() : List.of();
        List<String> recommendedTopics = (jobMatch != null && jobMatch.getRecommendations() != null) ? jobMatch.getRecommendations() : List.of();
        List<String> learningPlan = (jobMatch != null && jobMatch.getLearningPlan() != null) ? jobMatch.getLearningPlan() : List.of();

        boolean resumeAnalyzed = false;

        return new DashboardSummaryResponseDTO(
                totalInterviews,
                averageScore,
                bestScore,
                resumeAnalyzed,
                targetRole,
                recentInterviews,
                topicPerformance,
                strongTopics,
                weakTopics,
                matchedSkills,
                missingSkills,
                recommendedTopics,
                learningPlan
        );
    }
}
