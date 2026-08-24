package com.interviewarena.auth;

import com.interviewarena.auth.dto.RegisterRequest;
import com.interviewarena.auth.exception.EmailAlreadyUsedException;
import com.interviewarena.user.User;
import com.interviewarena.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    void register_savesUserWithHashedPassword() {
        AuthService authService = new AuthService(userRepository, passwordEncoder);
        when(userRepository.findByEmail("dev@example.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User result = authService.register(new RegisterRequest("dev@example.com", "plainpassword", "Dev User"));

        assertThat(result.getEmail()).isEqualTo("dev@example.com");
        assertThat(passwordEncoder.matches("plainpassword", result.getPasswordHash())).isTrue();
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_throwsWhenEmailAlreadyUsed() {
        AuthService authService = new AuthService(userRepository, passwordEncoder);
        when(userRepository.findByEmail("dev@example.com")).thenReturn(Optional.of(new User()));

        assertThatThrownBy(() ->
            authService.register(new RegisterRequest("dev@example.com", "plainpassword", "Dev User")))
            .isInstanceOf(EmailAlreadyUsedException.class);

        verify(userRepository, never()).save(any());
    }
}
