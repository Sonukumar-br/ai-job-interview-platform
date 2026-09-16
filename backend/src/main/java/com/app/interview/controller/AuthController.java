package com.app.interview.controller;

import com.app.interview.dto.AuthResponseDTO;
import com.app.interview.dto.LoginRequestDTO;
import com.app.interview.dto.UserRequestDTO;
import com.app.interview.dto.UserResponseDTO;
import com.app.interview.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@Valid @RequestBody UserRequestDTO requestDTO) {
        UserResponseDTO registeredUser = authService.register(requestDTO);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> loginUser(@Valid @RequestBody LoginRequestDTO loginDTO) {
        AuthResponseDTO authResponse = authService.login(loginDTO);
        return ResponseEntity.ok(authResponse);
    }
}
