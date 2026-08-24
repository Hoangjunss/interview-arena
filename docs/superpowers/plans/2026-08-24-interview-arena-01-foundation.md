# Interview Arena — Phase 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the monorepo, local infra (Postgres/Redis/Kafka), the
Spring Boot backend skeleton with JWT auth, and the React frontend skeleton
wired to that auth — the foundation every later phase builds on.

**Architecture:** A single git repo with `backend/` (Spring Boot 3, Java 21,
Maven), `web/` (React 18 + Vite + TypeScript), and `content/` (markdown
question files, phase 2). Local infra runs via `docker-compose` (Postgres,
Redis, Kafka+Zookeeper). Auth is stateless JWT issued by the backend;
Postgres schema is managed by Flyway migrations starting from `V1`.

**Tech Stack:** Java 21, Spring Boot 3.3, Spring Web, Spring Data JPA,
Spring Security, Flyway, PostgreSQL driver, JJWT (`io.jsonwebtoken`), Maven,
JUnit 5, Mockito, Testcontainers (postgres module); React 18, Vite,
TypeScript, React Router, Vitest + React Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-24-interview-arena-design.md`
**Overview/diagrams:** `docs/superpowers/plans/2026-08-24-interview-arena-00-overview.md`

## Global Constraints

- Java 21, Spring Boot 3.3.x (spec §4.1: "Backend: Java Spring Boot").
- PostgreSQL as the only relational store (spec §4.1).
- Passwords must never be stored in plaintext — BCrypt hashing only.
- JWT secret and DB/Redis/Kafka connection strings come from environment
  variables, never hardcoded (`application.yml` reads `${ENV_VAR}`).
- All new backend code lives under base package `com.interviewarena`.
- Frontend uses TypeScript strict mode (`"strict": true` in tsconfig).

---

### Task 1: Docker Compose infra + repo scaffolding

**Files:**
- Create: `docker-compose.yml`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `README.md`

**Interfaces:**
- Produces: running services reachable at `localhost:5432` (Postgres),
  `localhost:6379` (Redis), `localhost:9092` (Kafka) — every later task in
  every phase connects to these.

- [ ] **Step 1: Write `docker-compose.yml`**

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: interview_arena
      POSTGRES_USER: interview_arena
      POSTGRES_PASSWORD: interview_arena
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  zookeeper:
    image: confluentinc/cp-zookeeper:7.6.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"

volumes:
  pg_data:
```

- [ ] **Step 2: Write `.gitignore`**

```
target/
node_modules/
dist/
*.log
.env
.idea/
.vscode/
*.iml
```

- [ ] **Step 3: Write `.env.example`**

```
DB_URL=jdbc:postgresql://localhost:5432/interview_arena
DB_USERNAME=interview_arena
DB_PASSWORD=interview_arena
REDIS_HOST=localhost
REDIS_PORT=6379
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
JWT_SECRET=change-me-to-a-long-random-string-in-real-env
LLM_API_KEY=changeme
LLM_API_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o-mini
```

- [ ] **Step 4: Write `README.md`**

```markdown
# Interview Arena

Local dev:
1. `cp .env.example .env` and fill in real secrets.
2. `docker compose up -d` — starts Postgres, Redis, Kafka.
3. `cd backend && ./mvnw spring-boot:run`
4. `cd web && npm install && npm run dev`
```

- [ ] **Step 5: Verify infra boots**

Run: `docker compose up -d && docker compose ps`
Expected: `postgres`, `redis`, `zookeeper`, `kafka` all show `running`/`Up`.

- [ ] **Step 6: Commit**

```bash
git add docker-compose.yml .gitignore .env.example README.md
git commit -m "chore: add docker-compose infra and repo scaffolding"
```

---

### Task 2: Spring Boot skeleton + health endpoint

**Files:**
- Create: `backend/pom.xml`
- Create: `backend/src/main/java/com/interviewarena/InterviewArenaApplication.java`
- Create: `backend/src/main/java/com/interviewarena/common/HealthController.java`
- Create: `backend/src/main/resources/application.yml`
- Test: `backend/src/test/java/com/interviewarena/common/HealthControllerTest.java`

**Interfaces:**
- Produces: `GET /api/health` → `200 {"status":"UP"}` — used by all later
  smoke tests and by the frontend's initial connectivity check.

- [ ] **Step 1: Write `backend/pom.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.4</version>
  </parent>
  <groupId>com.interviewarena</groupId>
  <artifactId>backend</artifactId>
  <version>0.1.0</version>
  <properties>
    <java.version>21</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.kafka</groupId>
      <artifactId>spring-kafka</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.flywaydb</groupId>
      <artifactId>flyway-core</artifactId>
    </dependency>
    <dependency>
      <groupId>org.flywaydb</groupId>
      <artifactId>flyway-database-postgresql</artifactId>
    </dependency>
    <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt-api</artifactId>
      <version>0.12.6</version>
    </dependency>
    <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt-impl</artifactId>
      <version>0.12.6</version>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>io.jsonwebtoken</groupId>
      <artifactId>jjwt-jackson</artifactId>
      <version>0.12.6</version>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.yaml</groupId>
      <artifactId>snakeyaml</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.kafka</groupId>
      <artifactId>spring-kafka-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.testcontainers</groupId>
      <artifactId>postgresql</artifactId>
      <version>1.20.1</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.testcontainers</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>1.20.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

- [ ] **Step 2: Write `InterviewArenaApplication.java`**

```java
package com.interviewarena;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InterviewArenaApplication {
    public static void main(String[] args) {
        SpringApplication.run(InterviewArenaApplication.class, args);
    }
}
```

- [ ] **Step 3: Write `application.yml`**

```yaml
server:
  port: 8080

spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/interview_arena}
    username: ${DB_USERNAME:interview_arena}
    password: ${DB_PASSWORD:interview_arena}
  jpa:
    hibernate:
      ddl-auto: validate
    open-in-view: false
  data:
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
  kafka:
    bootstrap-servers: ${KAFKA_BOOTSTRAP_SERVERS:localhost:9092}
    consumer:
      group-id: interview-arena-backend
      auto-offset-reset: earliest

app:
  jwt:
    secret: ${JWT_SECRET:dev-only-secret-do-not-use-in-prod-please-change}
    expiration-minutes: 120
  llm:
    api-key: ${LLM_API_KEY:}
    base-url: ${LLM_API_BASE_URL:https://api.openai.com/v1}
    model: ${LLM_MODEL:gpt-4o-mini}
```

- [ ] **Step 4: Write failing test for health endpoint**

```java
package com.interviewarena.common;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void health_returns200AndUpStatus() throws Exception {
        mockMvc.perform(get("/api/health"))
            .andExpect(status().isOk())
            .andExpect(content().json("{\"status\":\"UP\"}"));
    }
}
```

Note: this `@SpringBootTest` will fail to even start at this point because
there is no `HealthController` yet and no Flyway migrations — that's
expected; Step 5 confirms the failure, Step 6 makes it pass by adding both.

- [ ] **Step 5: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=HealthControllerTest`
Expected: FAIL (application context fails to load — no controller, and
Hibernate `ddl-auto: validate` has nothing to validate against yet since no
migration exists).

- [ ] **Step 6: Write minimal implementation — controller + baseline migration**

`backend/src/main/java/com/interviewarena/common/HealthController.java`:
```java
package com.interviewarena.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
```

`backend/src/main/resources/db/migration/V1__baseline.sql`:
```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

(V1 only enables `gen_random_uuid()`, used by every entity's `id` column
starting Task 4. Flyway needs at least one migration file to exist for
`ddl-auto: validate` to have a baseline to check against.)

- [ ] **Step 7: Run test to verify it passes**

Run: `cd backend && docker compose up -d postgres && ./mvnw test -Dtest=HealthControllerTest` (run from repo root for docker compose, then `cd backend` for maven, or run compose from repo root in a separate terminal first)
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add backend/pom.xml backend/src
git commit -m "feat: bootstrap Spring Boot app with health endpoint"
```

---

### Task 3: User entity + Flyway migration + repository

**Files:**
- Create: `backend/src/main/resources/db/migration/V2__create_users.sql`
- Create: `backend/src/main/java/com/interviewarena/user/User.java`
- Create: `backend/src/main/java/com/interviewarena/user/UserRepository.java`
- Test: `backend/src/test/java/com/interviewarena/user/UserRepositoryTest.java`

**Interfaces:**
- Produces: `User` entity with fields `id: UUID`, `email: String`,
  `passwordHash: String`, `displayName: String`, `createdAt: Instant`.
  `UserRepository extends JpaRepository<User, UUID>` with
  `Optional<User> findByEmail(String email)` — consumed by Task 5
  (`AuthService`) and by every later phase's entities that hold a
  `userId: UUID` foreign key.

- [ ] **Step 1: Write migration**

```sql
-- V2__create_users.sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- [ ] **Step 2: Write failing repository test (Testcontainers)**

```java
package com.interviewarena.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Instant;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByEmail_returnsSavedUser() {
        User user = new User();
        user.setEmail("dev@example.com");
        user.setPasswordHash("hashed");
        user.setDisplayName("Dev User");
        user.setCreatedAt(Instant.now());
        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("dev@example.com");

        assertThat(found).isPresent();
        assertThat(found.get().getDisplayName()).isEqualTo("Dev User");
    }

    @Test
    void findByEmail_returnsEmptyWhenNotFound() {
        Optional<User> found = userRepository.findByEmail("nobody@example.com");

        assertThat(found).isEmpty();
    }
}
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=UserRepositoryTest`
Expected: FAIL (compile error — `User` and `UserRepository` don't exist yet).

- [ ] **Step 4: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/user/User.java
package com.interviewarena.user;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    public UUID getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
```

```java
// backend/src/main/java/com/interviewarena/user/UserRepository.java
package com.interviewarena.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=UserRepositoryTest`
Expected: PASS (Testcontainers pulls `postgres:16` and runs both tests
against a real, ephemeral Postgres instance with the Flyway migrations
applied on startup).

- [ ] **Step 6: Commit**

```bash
git add backend/src/main/resources/db/migration/V2__create_users.sql \
        backend/src/main/java/com/interviewarena/user \
        backend/src/test/java/com/interviewarena/user
git commit -m "feat: add User entity, migration, and repository"
```

---

### Task 4: Registration + password hashing (AuthService)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/auth/AuthService.java`
- Create: `backend/src/main/java/com/interviewarena/auth/dto/RegisterRequest.java`
- Create: `backend/src/main/java/com/interviewarena/auth/exception/EmailAlreadyUsedException.java`
- Create: `backend/src/main/java/com/interviewarena/config/SecurityBeansConfig.java`
- Test: `backend/src/test/java/com/interviewarena/auth/AuthServiceTest.java`

**Interfaces:**
- Consumes: `UserRepository` (Task 3) — `findByEmail`, `save`.
- Produces: `AuthService.register(RegisterRequest): User` — throws
  `EmailAlreadyUsedException` if the email is taken. Consumed by
  `AuthController` in Task 6. `PasswordEncoder` bean (BCrypt) consumed by
  Task 5 (login) too.

- [ ] **Step 1: Write failing unit test**

```java
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=AuthServiceTest`
Expected: FAIL (compile error — none of the classes exist yet).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/auth/dto/RegisterRequest.java
package com.interviewarena.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank @Email String email,
    @NotBlank @Size(min = 8) String password,
    @NotBlank String displayName
) {}
```

```java
// backend/src/main/java/com/interviewarena/auth/exception/EmailAlreadyUsedException.java
package com.interviewarena.auth.exception;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException(String email) {
        super("Email already used: " + email);
    }
}
```

```java
// backend/src/main/java/com/interviewarena/config/SecurityBeansConfig.java
package com.interviewarena.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityBeansConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

```java
// backend/src/main/java/com/interviewarena/auth/AuthService.java
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
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=AuthServiceTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/auth backend/src/main/java/com/interviewarena/config backend/src/test/java/com/interviewarena/auth
git commit -m "feat: add user registration with BCrypt password hashing"
```

---

### Task 5: JWT issuance + validation (JwtService)

**Files:**
- Create: `backend/src/main/java/com/interviewarena/auth/JwtService.java`
- Test: `backend/src/test/java/com/interviewarena/auth/JwtServiceTest.java`

**Interfaces:**
- Consumes: `app.jwt.secret` and `app.jwt.expiration-minutes` from
  `application.yml` (Task 2).
- Produces: `JwtService.generateToken(UUID userId, String email): String`
  and `JwtService.extractUserId(String token): UUID` (throws
  `io.jsonwebtoken.JwtException` on invalid/expired token). Consumed by
  `AuthController` (Task 6, to issue on login) and `JwtAuthFilter`
  (Task 6, to validate on every protected request).

- [ ] **Step 1: Write failing unit test**

```java
package com.interviewarena.auth;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtServiceTest {

    private final JwtService jwtService = new JwtService(
        "test-secret-key-must-be-at-least-256-bits-long-for-hs256!!", 60);

    @Test
    void generateAndExtract_roundTripsUserId() {
        UUID userId = UUID.randomUUID();

        String token = jwtService.generateToken(userId, "dev@example.com");
        UUID extracted = jwtService.extractUserId(token);

        assertThat(extracted).isEqualTo(userId);
    }

    @Test
    void extractUserId_throwsOnGarbageToken() {
        assertThatThrownBy(() -> jwtService.extractUserId("not-a-real-token"))
            .isInstanceOf(JwtException.class);
    }
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=JwtServiceTest`
Expected: FAIL (compile error — `JwtService` doesn't exist).

- [ ] **Step 3: Write minimal implementation**

```java
package com.interviewarena.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationMinutes;

    public JwtService(
        @Value("${app.jwt.secret}") String secret,
        @Value("${app.jwt.expiration-minutes}") long expirationMinutes
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMinutes = expirationMinutes;
    }

    public String generateToken(UUID userId, String email) {
        Instant now = Instant.now();
        return Jwts.builder()
            .subject(userId.toString())
            .claim("email", email)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(expirationMinutes, ChronoUnit.MINUTES)))
            .signWith(key)
            .compact();
    }

    public UUID extractUserId(String token) {
        String subject = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
        return UUID.fromString(subject);
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=JwtServiceTest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add backend/src/main/java/com/interviewarena/auth/JwtService.java backend/src/test/java/com/interviewarena/auth/JwtServiceTest.java
git commit -m "feat: add JWT issuance and validation service"
```

---

### Task 6: Auth endpoints + security filter chain

**Files:**
- Create: `backend/src/main/java/com/interviewarena/auth/dto/LoginRequest.java`
- Create: `backend/src/main/java/com/interviewarena/auth/dto/AuthResponse.java`
- Create: `backend/src/main/java/com/interviewarena/auth/AuthController.java`
- Create: `backend/src/main/java/com/interviewarena/auth/JwtAuthFilter.java`
- Create: `backend/src/main/java/com/interviewarena/config/SecurityConfig.java`
- Modify: `backend/src/main/java/com/interviewarena/auth/AuthService.java` (add `login`)
- Test: `backend/src/test/java/com/interviewarena/auth/AuthControllerTest.java`

**Interfaces:**
- Consumes: `AuthService` (Task 4), `JwtService` (Task 5).
- Produces: `POST /api/auth/register` → `201 AuthResponse{token, userId,
  email, displayName}`; `POST /api/auth/login` → `200 AuthResponse` or
  `401` on bad credentials. `JwtAuthFilter` sets
  `SecurityContextHolder` with the authenticated user's UUID as
  `Authentication.principal` — every later controller in phases 2-6 reads
  the current user via `@AuthenticationPrincipal` or
  `SecurityContextHolder.getContext().getAuthentication().getName()`
  (implemented to return `userId.toString()`).

- [ ] **Step 1: Write failing integration test**

```java
package com.interviewarena.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewarena.auth.dto.LoginRequest;
import com.interviewarena.auth.dto.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
class AuthControllerTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void props(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && ./mvnw test -Dtest=AuthControllerTest`
Expected: FAIL (compile error — `LoginRequest`, `AuthController`, etc. don't
exist; also `/api/health` currently has no security config so this specific
failure mode will shift once classes exist — that's fine, re-run after each
sub-step if useful).

- [ ] **Step 3: Write minimal implementation**

```java
// backend/src/main/java/com/interviewarena/auth/dto/LoginRequest.java
package com.interviewarena.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@NotBlank String email, @NotBlank String password) {}
```

```java
// backend/src/main/java/com/interviewarena/auth/dto/AuthResponse.java
package com.interviewarena.auth.dto;

import java.util.UUID;

public record AuthResponse(String token, UUID userId, String email, String displayName) {}
```

Add `login` to `AuthService` (modify existing file, append method):
```java
    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new org.springframework.security.authentication.BadCredentialsException("Invalid credentials"));
        if (!passwordEncoder.matches(rawPassword, user.getPasswordHash())) {
            throw new org.springframework.security.authentication.BadCredentialsException("Invalid credentials");
        }
        return user;
    }
```

```java
// backend/src/main/java/com/interviewarena/auth/AuthController.java
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
}
```

```java
// backend/src/main/java/com/interviewarena/auth/JwtAuthFilter.java
package com.interviewarena.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring("Bearer ".length());
            try {
                UUID userId = jwtService.extractUserId(token);
                var authentication = new UsernamePasswordAuthenticationToken(
                    userId.toString(), null, List.of());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (io.jsonwebtoken.JwtException ignored) {
                // leave unauthenticated; SecurityConfig decides what happens next
            }
        }
        filterChain.doFilter(request, response);
    }
}
```

```java
// backend/src/main/java/com/interviewarena/config/SecurityConfig.java
package com.interviewarena.config;

import com.interviewarena.auth.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && ./mvnw test -Dtest=AuthControllerTest`
Expected: PASS.

- [ ] **Step 5: Run full backend test suite**

Run: `cd backend && ./mvnw test`
Expected: PASS (all tests from Tasks 2-6 green).

- [ ] **Step 6: Commit**

```bash
git add backend/src
git commit -m "feat: add login/register endpoints, JWT filter, and security config"
```

---

### Task 7: React + Vite + TypeScript skeleton

**Files:**
- Create: `web/package.json`
- Create: `web/vite.config.ts`
- Create: `web/tsconfig.json`
- Create: `web/index.html`
- Create: `web/src/main.tsx`
- Create: `web/src/App.tsx`
- Create: `web/src/api/client.ts`
- Test: `web/src/api/client.test.ts`

**Interfaces:**
- Produces: `apiClient` — a typed fetch wrapper: `apiClient.get<T>(path):
  Promise<T>`, `apiClient.post<T>(path, body): Promise<T>`, both attaching
  `Authorization: Bearer <token>` from `localStorage.getItem('token')` when
  present, and throwing `ApiError` (with `.status`) on non-2xx. Consumed by
  every feature's `src/api/*.ts` module in phases 2-6.

- [ ] **Step 1: Scaffold with Vite**

Run: `cd web && npm create vite@latest . -- --template react-ts`
(accept overwrite of empty dir if prompted)

- [ ] **Step 2: Install extra deps**

Run: `cd web && npm install react-router-dom @tanstack/react-query && npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`

- [ ] **Step 3: Configure Vitest in `vite.config.ts`**

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/vitest.setup.ts',
  },
})
```

Create `web/src/vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

Add to `web/tsconfig.json` `compilerOptions`: `"strict": true` (verify it is
already `true` from the Vite react-ts template; it is by default).

- [ ] **Step 4: Write failing test for `apiClient`**

```typescript
// web/src/api/client.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { apiClient, ApiError } from './client'

describe('apiClient', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('attaches Authorization header when token is present', async () => {
    localStorage.setItem('token', 'abc123')
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'UP' }),
    })

    await apiClient.get('/api/health')

    expect(fetch).toHaveBeenCalledWith(
      '/api/health',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer abc123' }),
      })
    )
  })

  it('throws ApiError with status on non-2xx response', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    })

    await expect(apiClient.get('/api/health')).rejects.toBeInstanceOf(ApiError)
  })
})
```

- [ ] **Step 5: Run test to verify it fails**

Run: `cd web && npx vitest run src/api/client.test.ts`
Expected: FAIL (`./client` module doesn't exist).

- [ ] **Step 6: Write minimal implementation**

```typescript
// web/src/api/client.ts
export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function handle<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: response.statusText }))
    throw new ApiError(response.status, body.message ?? 'Request failed')
  }
  return response.json() as Promise<T>
}

export const apiClient = {
  get: async <T>(path: string): Promise<T> => {
    const response = await fetch(path, { headers: buildHeaders() })
    return handle<T>(response)
  },
  post: async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(path, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(body),
    })
    return handle<T>(response)
  },
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `cd web && npx vitest run src/api/client.test.ts`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add web/package.json web/package-lock.json web/vite.config.ts web/tsconfig.json web/index.html web/src
git commit -m "feat: scaffold React+Vite+TS frontend with typed API client"
```

---

### Task 8: Auth context + Login/Register pages wired to backend

**Files:**
- Create: `web/src/auth/AuthContext.tsx`
- Create: `web/src/auth/useAuth.ts`
- Create: `web/src/api/auth.ts`
- Create: `web/src/types/auth.ts`
- Create: `web/src/pages/LoginPage.tsx`
- Create: `web/src/pages/RegisterPage.tsx`
- Modify: `web/src/App.tsx` (add router + `AuthProvider`)
- Test: `web/src/auth/AuthContext.test.tsx`

**Interfaces:**
- Consumes: `apiClient` (Task 7).
- Produces: `useAuth(): { user: AuthUser | null, login(email,password):
  Promise<void>, register(email,password,displayName): Promise<void>,
  logout(): void }` — the hook every protected page in phases 2-6 uses to
  read the current user and redirect to `/login` if absent.

- [ ] **Step 1: Write shared types**

```typescript
// web/src/types/auth.ts
export interface AuthUser {
  userId: string
  email: string
  displayName: string
}

export interface AuthResponse extends AuthUser {
  token: string
}
```

```typescript
// web/src/api/auth.ts
import { apiClient } from './client'
import type { AuthResponse } from '../types/auth'

export const authApi = {
  register: (email: string, password: string, displayName: string) =>
    apiClient.post<AuthResponse>('/api/auth/register', { email, password, displayName }),
  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/api/auth/login', { email, password }),
}
```

- [ ] **Step 2: Write failing test for `AuthContext`**

```tsx
// web/src/auth/AuthContext.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from './AuthContext'
import { useAuth } from './useAuth'
import { authApi } from '../api/auth'

vi.mock('../api/auth', () => ({
  authApi: { login: vi.fn(), register: vi.fn() },
}))

function TestConsumer() {
  const { user, login } = useAuth()
  return (
    <div>
      <span data-testid="user">{user ? user.email : 'anonymous'}</span>
      <button onClick={() => login('dev@example.com', 'pw')}>login</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('starts as anonymous and becomes authenticated after login()', async () => {
    ;(authApi.login as any).mockResolvedValueOnce({
      token: 'tok123',
      userId: 'u1',
      email: 'dev@example.com',
      displayName: 'Dev',
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    expect(screen.getByTestId('user').textContent).toBe('anonymous')

    fireEvent.click(screen.getByText('login'))

    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('dev@example.com'))
    expect(localStorage.getItem('token')).toBe('tok123')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd web && npx vitest run src/auth/AuthContext.test.tsx`
Expected: FAIL (`./AuthContext` and `./useAuth` don't exist).

- [ ] **Step 4: Write minimal implementation**

```tsx
// web/src/auth/AuthContext.tsx
import { createContext, useState, ReactNode } from 'react'
import { authApi } from '../api/auth'
import type { AuthUser } from '../types/auth'

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readInitialUser(): AuthUser | null {
  const raw = localStorage.getItem('user')
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readInitialUser)

  function persist(authUser: AuthUser, token: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(authUser))
    setUser(authUser)
  }

  async function login(email: string, password: string) {
    const response = await authApi.login(email, password)
    persist({ userId: response.userId, email: response.email, displayName: response.displayName }, response.token)
  }

  async function register(email: string, password: string, displayName: string) {
    const response = await authApi.register(email, password, displayName)
    persist({ userId: response.userId, email: response.email, displayName: response.displayName }, response.token)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

```typescript
// web/src/auth/useAuth.ts
import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd web && npx vitest run src/auth/AuthContext.test.tsx`
Expected: PASS.

- [ ] **Step 6: Write Login/Register pages and wire routing**

```tsx
// web/src/pages/LoginPage.tsx
import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Email hoặc mật khẩu không đúng')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Đăng nhập</h1>
      {error && <p role="alert">{error}</p>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Đăng nhập</button>
      <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
    </form>
  )
}
```

```tsx
// web/src/pages/RegisterPage.tsx
import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await register(email, password, displayName)
      navigate('/')
    } catch {
      setError('Đăng ký thất bại, email có thể đã được sử dụng')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Đăng ký</h1>
      {error && <p role="alert">{error}</p>}
      <input placeholder="Tên hiển thị" value={displayName} onChange={e => setDisplayName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Đăng ký</button>
      <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    </form>
  )
}
```

```tsx
// web/src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function HomePage() {
  return <h1>Interview Arena</h1>
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
```

- [ ] **Step 7: Manual smoke test**

Run backend (`./mvnw spring-boot:run` from `backend/`) and frontend
(`npm run dev` from `web/`), open `http://localhost:5173/register`,
register a user, confirm redirect to `/` and `localStorage` has `token`.

- [ ] **Step 8: Commit**

```bash
git add web/src
git commit -m "feat: add auth context, login/register pages, and routing"
```

---

## Definition of done for this phase

- `docker compose up -d` starts Postgres/Redis/Kafka cleanly.
- `cd backend && ./mvnw test` passes fully.
- `cd web && npx vitest run` passes fully.
- Manual: register → login → land on `/` with a persisted session works in
  the browser end to end.
