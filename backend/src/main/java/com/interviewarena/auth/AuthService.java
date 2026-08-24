package com.interviewarena.auth;

import com.interviewarena.auth.dto.RegisterRequest;
import com.interviewarena.auth.exception.EmailAlreadyUsedException;
import com.interviewarena.user.User;
import com.interviewarena.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailAlreadyUsedException(request.email());
        }
        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setDisplayName(request.displayName());
        user.setCreatedAt(Instant.now());
        return userRepository.save(user);
    }

    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new org.springframework.security.authentication.BadCredentialsException("Invalid credentials"));
        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new org.springframework.security.authentication.BadCredentialsException("Invalid credentials");
        }
        return user;
    }
}
