package com.app.interview.controller;

import com.app.interview.dto.ResumeAnalysisResponseDTO;
import com.app.interview.service.ResumeService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResumeAnalysisResponseDTO> analyzeResume(@RequestParam("file") MultipartFile file) {
        ResumeAnalysisResponseDTO response = resumeService.analyzeResume(file);
        return ResponseEntity.ok(response);
    }
}
