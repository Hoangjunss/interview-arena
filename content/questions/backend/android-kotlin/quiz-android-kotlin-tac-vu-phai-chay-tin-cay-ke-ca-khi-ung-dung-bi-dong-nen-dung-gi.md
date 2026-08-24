---
id: quiz-android-kotlin-tac-vu-phai-chay-tin-cay-ke-ca-khi-ung-dung-bi-dong-nen-dung-gi
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tác vụ phải chạy tin cậy kể cả khi ứng dụng bị đóng nên dùng gì?

## Đáp án trắc nghiệm
- [x] Bộ lập lịch công việc của hệ thống
- [ ] Background thread tạo trực tiếp trong Activity
- [ ] Bộ đếm giờ đặt lại mỗi lần mở ứng dụng
- [ ] Coroutine trong phạm vi toàn cục của ứng dụng

## Giải thích (VI)
Dùng bộ lập lịch công việc của hệ thống. Công việc được lưu lại và chạy khi đủ điều kiện như có mạng hoặc đang sạc, sống qua việc ứng dụng bị đóng và cả khi thiết bị khởi động lại.

### Giải thích các phương án:
- **Bộ lập lịch công việc của hệ thống** (Đúng): Hệ thống lưu công việc lại và chạy khi đủ điều kiện, kể cả sau khi thiết bị khởi động lại.
- **Background thread tạo trực tiếp trong Activity** (Sai): Luồng chết theo tiến trình.
- **Bộ đếm giờ đặt lại mỗi lần mở ứng dụng** (Sai): Không chạy được khi ứng dụng không mở.
- **Coroutine trong phạm vi toàn cục của ứng dụng** (Sai): Nó chết cùng tiến trình khi ứng dụng bị đóng.
