package com.interviewarena.auth;

import com.interviewarena.auth.dto.AuthResponse;
import com.interviewarena.auth.dto.LoginRequest;
import com.interviewarena.auth.dto.RegisterRequest;
import com.interviewarena.user.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = authService.register(request);
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(new AuthResponse(token, user.getId(), user.getEmail(), user.getDisplayName()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = authService.login(request.email(), request.password());
        String token = jwtService.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getEmail(), user.getDisplayName()));
    }

    @ExceptionHandler(org.springframework.security.authentication.BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials(org.springframework.security.authentication.BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(com.interviewarena.auth.exception.EmailAlreadyUsedException.class)
    public ResponseEntity<String> handleEmailAlreadyUsed(com.interviewarena.auth.exception.EmailAlreadyUsedException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
}
