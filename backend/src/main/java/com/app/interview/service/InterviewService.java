package com.app.interview.service;

import com.app.interview.dto.*;
import com.app.interview.entity.Interview;
import com.app.interview.entity.User;
import com.app.interview.exception.ResourceNotFoundException;
import com.app.interview.repository.InterviewRepository;
import com.app.interview.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewService {

    private final AIService aiService;
    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public InterviewService(AIService aiService, InterviewRepository interviewRepository, UserRepository userRepository) {
        this.aiService = aiService;
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
    }

    public QuestionResponseDTO generateQuestion(InterviewRequestDTO requestDTO) {
        String topic = requestDTO.getTopic().trim();
        String difficulty = requestDTO.getDifficulty().trim();

        String questionText = aiService.generateQuestion(topic, difficulty);

        return new QuestionResponseDTO(questionText, topic, difficulty);
    }

    @Transactional
    public InterviewEvaluationResponseDTO evaluateAndSaveAnswer(InterviewEvaluationRequestDTO requestDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        String question = requestDTO.getQuestion().trim();
        String answer = requestDTO.getAnswer().trim();
        String topic = requestDTO.getTopic().trim();
        String difficulty = (requestDTO.getDifficulty() != null && !requestDTO.getDifficulty().trim().isEmpty())
                ? requestDTO.getDifficulty().trim()
                : "Medium";

        // 1. Evaluate with AI
        InterviewEvaluationResponseDTO evalResult = aiService.evaluateAnswer(question, answer, topic);

        // 2. Persist in MySQL Database linked to authenticated User
        Interview interview = new Interview();
        interview.setUser(user);
        interview.setTopic(topic);
        interview.setDifficulty(difficulty);
        interview.setQuestion(question);
        interview.setUserAnswer(answer);
        interview.setScore(evalResult.getScore());
        interview.setCorrectness(evalResult.getCorrectness());
        interview.setStrengths(evalResult.getStrengths());
        interview.setImprovements(evalResult.getImprovements());
        interview.setIdealAnswer(evalResult.getIdealAnswer());

        interviewRepository.save(interview);

        return evalResult;
    }

    @Transactional(readOnly = true)
    public List<InterviewSummaryDTO> getUserInterviewHistory(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        return interviewRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::mapToSummaryDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InterviewDetailDTO getInterviewById(Long id, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        // Enforce strict user isolation: User can only fetch their own interview!
        Interview interview = interviewRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Interview session not found with id: " + id));

        return mapToDetailDTO(interview);
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO getUserDashboardStats(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        Long userId = user.getId();
        long totalInterviews = interviewRepository.countByUserId(userId);
        double avgScore = interviewRepository.findAverageScoreByUserId(userId).orElse(0.0);
        int bestScore = interviewRepository.findMaxScoreByUserId(userId).orElse(0);

        List<InterviewSummaryDTO> recent = interviewRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .limit(5)
                .map(this::mapToSummaryDTO)
                .collect(Collectors.toList());

        // Round average score to 1 decimal place
        double roundedAvgScore = Math.round(avgScore * 10.0) / 10.0;

        return new DashboardStatsDTO(totalInterviews, roundedAvgScore, bestScore, recent);
    }

    private InterviewSummaryDTO mapToSummaryDTO(Interview interview) {
        return new InterviewSummaryDTO(
                interview.getId(),
                interview.getTopic(),
                interview.getDifficulty(),
                interview.getQuestion(),
                interview.getScore(),
                interview.getCreatedAt()
        );
    }

    private InterviewDetailDTO mapToDetailDTO(Interview interview) {
        return new InterviewDetailDTO(
                interview.getId(),
                interview.getTopic(),
                interview.getDifficulty(),
                interview.getQuestion(),
                interview.getUserAnswer(),
                interview.getScore(),
                interview.getCorrectness(),
                interview.getStrengths(),
                interview.getImprovements(),
                interview.getIdealAnswer(),
                interview.getCreatedAt()
        );
    }
}
