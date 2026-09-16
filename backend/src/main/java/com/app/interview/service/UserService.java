package com.app.interview.service;

import com.app.interview.dto.UserRequestDTO;
import com.app.interview.dto.UserResponseDTO;
import com.app.interview.entity.User;
import com.app.interview.exception.ResourceNotFoundException;
import com.app.interview.exception.UserAlreadyExistsException;
import com.app.interview.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponseDTO createUser(UserRequestDTO requestDTO) {
        if (userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new UserAlreadyExistsException("User with email '" + requestDTO.getEmail() + "' already exists");
        }

        User user = new User();
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        user.setRole("ROLE_USER");

        User savedUser = userRepository.save(user);

        return mapToResponseDTO(savedUser);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToResponseDTO(user);
    }

    @Transactional(readOnly = true)
    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user profile not found"));
        return mapToResponseDTO(user);
    }

    private UserResponseDTO mapToResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
