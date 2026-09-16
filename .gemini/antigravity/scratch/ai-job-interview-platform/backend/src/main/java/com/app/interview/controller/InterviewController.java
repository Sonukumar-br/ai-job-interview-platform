package com.app.interview.controller;

import com.app.interview.dto.*;
import com.app.interview.service.InterviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping("/generate")
    public ResponseEntity<QuestionResponseDTO> generateQuestion(@Valid @RequestBody InterviewRequestDTO requestDTO) {
        QuestionResponseDTO response = interviewService.generateQuestion(requestDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<InterviewEvaluationResponseDTO> evaluateAnswer(@Valid @RequestBody InterviewEvaluationRequestDTO requestDTO,
                                                                         Authentication authentication) {
        String userEmail = authentication.getName();
        InterviewEvaluationResponseDTO response = interviewService.evaluateAndSaveAnswer(requestDTO, userEmail);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<InterviewSummaryDTO>> getInterviewHistory(Authentication authentication) {
        String userEmail = authentication.getName();
        List<InterviewSummaryDTO> history = interviewService.getUserInterviewHistory(userEmail);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats(Authentication authentication) {
        String userEmail = authentication.getName();
        DashboardStatsDTO stats = interviewService.getUserDashboardStats(userEmail);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewDetailDTO> getInterviewById(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        InterviewDetailDTO detail = interviewService.getInterviewById(id, userEmail);
        return ResponseEntity.ok(detail);
    }
}
