package com.app.interview.service;

import com.app.interview.dto.ResumeAnalysisResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ResumeService {

    private final PdfTextExtractorService pdfTextExtractorService;
    private final AIService aiService;

    public ResumeService(PdfTextExtractorService pdfTextExtractorService, AIService aiService) {
        this.pdfTextExtractorService = pdfTextExtractorService;
        this.aiService = aiService;
    }

    public ResumeAnalysisResponseDTO analyzeResume(MultipartFile file) {
        // 1. Extract text from PDF in-memory (validates file, extension, size <= 5MB, encryption)
        String extractedText = pdfTextExtractorService.extractTextFromPdf(file);

        // 2. Delegate extracted text to AIService for structured LLM evaluation
        return aiService.analyzeResume(extractedText);
    }
}
