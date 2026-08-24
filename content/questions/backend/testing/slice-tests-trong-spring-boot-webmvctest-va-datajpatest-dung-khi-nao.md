---
id: slice-tests-trong-spring-boot-webmvctest-va-datajpatest-dung-khi-nao
position: backend
technology: testing
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Slice tests trong Spring Boot: @WebMvcTest và @DataJpaTest dùng khi nào?

## Question (EN)
Slice tests in Spring Boot: when do you use @WebMvcTest and @DataJpaTest?

## Đáp án chi tiết (VI)
**Slice test** chỉ load **một phần** ApplicationContext — nhanh hơn `@SpringBootTest`, isolate layer cần test.\
\
**@WebMvcTest — controller layer:**\
```java\
@WebMvcTest(UserController.class)\
class UserControllerTest {\
  @Autowired MockMvc mvc;\
  @MockBean UserService service;\
\
  @Test void getUser() throws Exception {\
    when(service.find(1L)).thenReturn(new User(1L, \\"Alice\\"));\
    mvc.perform(get(\\"/api/users/1\\")).andExpect(status().isOk())\
       .andExpect(jsonPath(\\"$.name\\").value(\\"Alice\\"));\
  }\
}\
```\
\
**@DataJpaTest — repository layer:**\
```java\
@DataJpaTest\
class UserRepositoryTest {\
  @Autowired UserRepository repo;\
\
  @Test void findByEmail() {\
    repo.save(new User(\\"alice@ex.com\\"));\
    assertThat(repo.findByEmail(\\"alice@ex.com\\")).isPresent();\
  }\
}\
```\
\
**Slice khác:** `@JsonTest`, `@WebFluxTest`, `@RestClientTest`, `@DataMongoTest`. **Chọn:** controller → `@WebMvcTest`; query → `@DataJpaTest` (+ Testcontainers); full flow → `@SpringBootTest`. (Boot 3.4+: `@MockBean` → `@MockitoBean`.)

## Detailed Answer (EN)
$82
