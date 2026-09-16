package com.app.interview.controller;

import com.app.interview.dto.SkillGapRequestDTO;
import com.app.interview.dto.SkillGapResponseDTO;
import com.app.interview.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<SkillGapResponseDTO> analyzeSkillGap(@Valid @RequestBody SkillGapRequestDTO requestDTO) {
        SkillGapResponseDTO response = skillService.analyzeSkillGap(requestDTO);
        return ResponseEntity.ok(response);
    }
}
