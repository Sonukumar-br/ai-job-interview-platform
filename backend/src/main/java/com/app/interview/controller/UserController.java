package com.app.interview.controller;

import com.app.interview.dto.UserResponseDTO;
import com.app.interview.exception.ResourceNotFoundException;
import com.app.interview.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUserProfile(Authentication authentication) {
        String userEmail = authentication.getName();
        UserResponseDTO user = userService.getUserByEmail(userEmail);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id, Authentication authentication) {
        String userEmail = authentication.getName();
        UserResponseDTO currentUser = userService.getUserByEmail(userEmail);

        // Strict IDOR Prevention: Users can only view their own user profile data
        if (!currentUser.getId().equals(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }

        return ResponseEntity.ok(currentUser);
    }
}
