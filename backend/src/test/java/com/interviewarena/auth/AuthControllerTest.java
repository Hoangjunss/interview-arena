package com.interviewarena.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewarena.auth.dto.LoginRequest;
import com.interviewarena.auth.dto.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class AuthControllerTest {

    static {
        if (checkDockerAvailable()) {
            PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");
            postgres.start();
            System.setProperty("spring.datasource.url", postgres.getJdbcUrl());
            System.setProperty("spring.datasource.username", postgres.getUsername());
            System.setProperty("spring.datasource.password", postgres.getPassword());
        } else {
            System.setProperty("spring.datasource.url", "jdbc:postgresql://localhost:5432/interview_arena");
            System.setProperty("spring.datasource.username", "interview_arena");
            System.setProperty("spring.datasource.password", "interview_arena");
        }
    }

    private static boolean checkDockerAvailable() {
        try {
            return org.testcontainers.DockerClientFactory.instance().isDockerAvailable();
        } catch (Throwable t) {
            return false;
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private com.interviewarena.user.UserRepository userRepository;

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        userRepository.deleteAllInBatch();
    }

    @Test
    void register_thenLogin_thenAccessProtectedRoute() throws Exception {
        RegisterRequest register = new RegisterRequest("dev@example.com", "plainpassword", "Dev User");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.token").isNotEmpty());

        LoginRequest login = new LoginRequest("dev@example.com", "plainpassword");
        String loginResponse = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(login)))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

        String token = objectMapper.readTree(loginResponse).get("token").asText();

        mockMvc.perform(get("/api/health")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk());
    }

    @Test
    void login_withWrongPassword_returns401() throws Exception {
        RegisterRequest register = new RegisterRequest("dev2@example.com", "plainpassword", "Dev User 2");
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)))
            .andExpect(status().isCreated());

        LoginRequest badLogin = new LoginRequest("dev2@example.com", "wrongpassword");
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(badLogin)))
            .andExpect(status().isUnauthorized());
    }
}
