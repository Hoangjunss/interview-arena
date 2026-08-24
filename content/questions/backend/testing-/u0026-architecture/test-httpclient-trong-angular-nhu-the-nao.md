---
id: test-httpclient-trong-angular-nhu-the-nao
position: backend
technology: testing-\u0026-architecture
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test HttpClient trong Angular như thế nào?

## Question (EN)
How do you test HttpClient in Angular?

## Đáp án chi tiết (VI)
Dùng `provideHttpClient()` cùng `provideHttpClientTesting()` để thay backend thật bằng test backend, rồi dùng `HttpTestingController` để assert request và flush response.\
\
Ví dụ:\
```typescript\
TestBed.configureTestingModule({\
  providers: [UserApi, provideHttpClient(), provideHttpClientTesting()],\
})\
\
const api = TestBed.inject(UserApi)\
const http = TestBed.inject(HttpTestingController)\
const promise = firstValueFrom(api.getUser(\\"42\\"))\
\
http.expectOne(\\"/api/users/42\\").flush({ id: \\"42\\

## Detailed Answer (EN)
Use `provideHttpClient()` together with `provideHttpClientTesting()` to replace the real backend with a test backend, then use `HttpTestingController` to assert requests and flush responses.\
\
Example:\
```typescript\
TestBed.configureTestingModule({\
  providers: [UserApi, provideHttpClient(), provideHttpClientTesting()],\
})\
\
const api = TestBed.inject(UserApi)\
const http = TestBed.inject(HttpTestingController)\
const promise = firstValueFrom(api.getUser(\\"42\\"))\
\
http.expectOne(\\"/api/users/42\\").flush({ id: \\"42\\
