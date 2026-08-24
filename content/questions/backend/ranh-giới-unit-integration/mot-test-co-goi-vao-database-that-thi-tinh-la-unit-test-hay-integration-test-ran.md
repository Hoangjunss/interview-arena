---
id: mot-test-co-goi-vao-database-that-thi-tinh-la-unit-test-hay-integration-test-ran
position: backend
technology: ranh-giới-unit-integration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Một test có gọi vào database thật thì tính là unit test hay integration test? Ranh giới đặt ở đâu?

## Question (EN)
If a test hits a real database, is it a unit test or an integration test? Where is the line?

## Đáp án chi tiết (VI)
Không có định nghĩa duy nhất, và đó là lý do câu này hay được hỏi để xem bạn hiểu **mục đích** hay chỉ thuộc nhãn.\
\
Cách phân biệt dùng được trong thực tế, dựa trên **thứ test kiểm soát được**:\
\
- **Unit test**: chỉ chạy code trong process, không chạm mạng, không chạm file, không chạm DB. Chạy vài mili giây, chạy song song thoải mái, không cần dọn dẹp.\
- **Integration test**: có chạm ít nhất một thành phần ngoài process — DB, message queue, HTTP client. Chậm hơn (chục đến trăm mili giây), cần dữ liệu sạch giữa các lần chạy.\
- **E2E**: chạy qua giao diện/HTTP thật của hệ thống đã deploy, gồm nhiều service.\
\
Với câu hỏi ban đầu: test chạy repository trên Postgres thật (kể cả bằng Docker/Testcontainers) là **integration test**, dù nó chỉ kiểm tra một hàm.\
\
Điều quan trọng hơn cái nhãn: **quyết định gì theo nó**. Test nhanh và độc lập thì chạy mỗi lần lưu file; test chạm DB thì gom vào một lệnh riêng chạy trong CI. Trả lời được điều này thì tranh cãi \\"unit là gì\\" trở nên không cần thiết.

## Detailed Answer (EN)
There is no single accepted definition — which is why this is asked: to see whether you understand the **purpose** or just memorised labels.\
\
A workable distinction in practice, based on **what the test controls**:\
\
- **Unit test**: runs in-process only — no network, no filesystem, no database. Milliseconds, safely parallel, no cleanup needed.\
- **Integration test**: touches at least one out-of-process component — DB, message queue, HTTP client. Slower (tens to hundreds of ms), needs clean data between runs.\
- **E2E**: drives the deployed system through its real UI/HTTP surface, across several services.\
\
For the original question: a repository test running against real Postgres (even via Docker/Testcontainers) is an **integration test**, even though it exercises one function.\
\
What matters more than the label is **what you decide based on it**. Fast isolated tests run on every file save; DB-touching tests get their own command in CI. Once that is settled, the \\"what counts as a unit\\" argument stops mattering.
