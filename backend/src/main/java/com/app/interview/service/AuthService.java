package com.app.interview.service;

import com.app.interview.dto.AuthResponseDTO;
import com.app.interview.dto.LoginRequestDTO;
import com.app.interview.dto.UserRequestDTO;
import com.app.interview.dto.UserResponseDTO;
import com.app.interview.entity.User;
import com.app.interview.exception.ResourceNotFoundException;
import com.app.interview.repository.UserRepository;
import com.app.interview.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserService userService, UserRepository userRepository,
                       AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public UserResponseDTO register(UserRequestDTO requestDTO) {
        return userService.createUser(requestDTO);
    }

    @Transactional(readOnly = true)
    public AuthResponseDTO login(LoginRequestDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + loginDTO.getEmail()));

        return new AuthResponseDTO(
                jwtToken,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
