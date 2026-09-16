package com.app.interview.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PdfTextExtractorService {

    private static final Logger logger = LoggerFactory.getLogger(PdfTextExtractorService.class);

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    private static final int MAX_TEXT_LENGTH = 15000; // 15,000 chars max (~3000 words)

    public String extractTextFromPdf(MultipartFile file) {
        // 1. Validate File Presence
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded resume file cannot be empty");
        }

        // 2. Validate File Size (<= 5 MB)
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds the 5 MB maximum limit");
        }

        // 3. Validate Extension and Content-Type
        String filename = file.getOriginalFilename();
        if (filename == null || !filename.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF format files (.pdf) are allowed");
        }

        String contentType = file.getContentType();
        if (contentType != null && !contentType.isEmpty()) {
            String normType = contentType.toLowerCase().trim();
            if (!normType.contains("pdf") && !normType.equals("application/octet-stream")) {
                throw new IllegalArgumentException("Invalid file MIME type. Only PDF documents are allowed.");
            }
        }

        // 4. In-memory Text Extraction using Apache PDFBox
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            if (document.isEncrypted()) {
                throw new IllegalArgumentException("Password-protected or encrypted PDF files are not supported. Please upload an unlocked PDF.");
            }

            PDFTextStripper textStripper = new PDFTextStripper();
            String extractedText = textStripper.getText(document);

            if (extractedText == null || extractedText.trim().isEmpty()) {
                throw new IllegalArgumentException("Could not extract readable text from PDF. Scanned images or empty PDFs are not supported. Please upload a text-selectable PDF resume.");
            }

            String trimmedText = extractedText.trim();
            
            // 5. Truncate text if unusually large to prevent memory exhaustion / DoS
            if (trimmedText.length() > MAX_TEXT_LENGTH) {
                logger.warn("Resume text exceeds max length ({} chars). Truncating for AI evaluation safety.", MAX_TEXT_LENGTH);
                trimmedText = trimmedText.substring(0, MAX_TEXT_LENGTH);
            }

            return trimmedText;
        } catch (IOException e) {
            logger.error("Failed to parse PDF document structure: {}", e.getMessage());
            throw new IllegalArgumentException("Corrupted or invalid PDF file structure.");
        }
    }
}
