---
id: instrumentation-testing-va-unit-testing-khac-nhau-nhu-the-nao-va-khi-nao-dung-lo
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Instrumentation testing và unit testing khác nhau như thế nào và khi nào dùng loại nào?

## Question (EN)
Explain instrumentation testing and unit testing, and when to use each.

## Đáp án chi tiết (VI)
Unit test chạy trên JVM không cần Android dependency (nhanh, không cần thiết bị). Dùng cho ViewModel, Repository, và utility logic. Instrumentation test chạy trên thiết bị/emulator với đầy đủ Android framework (chậm, cần thiết bị). Dùng cho Activity, Fragment, và UI behavior. Theo testing pyramid: 70% unit test, 20% integration, 10% UI test. Tool: JUnit + Mockito cho unit, Espresso/Compose Testing cho UI.

## Detailed Answer (EN)
Unit tests run on the JVM without Android dependencies (fast, no device needed). Use for ViewModel, Repository, and utility logic. Instrumentation tests run on devices/emulators with full Android framework access (slow, need device). Use for Activities, Fragments, and UI behavior. Follow the testing pyramid: 70% unit tests, 20% integration, 10% UI tests.
