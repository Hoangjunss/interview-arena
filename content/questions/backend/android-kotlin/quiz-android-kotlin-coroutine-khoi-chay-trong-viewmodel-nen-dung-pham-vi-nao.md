---
id: quiz-android-kotlin-coroutine-khoi-chay-trong-viewmodel-nen-dung-pham-vi-nao
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Coroutine khởi chạy trong ViewModel nên dùng phạm vi nào?

## Đáp án trắc nghiệm
- [ ] Phạm vi tạo mới trong mỗi hàm cần dùng
- [ ] Phạm vi gắn với Activity đang hiển thị
- [x] Phạm vi gắn với ViewModel, tự huỷ khi bị xoá
- [ ] Phạm vi toàn cục để công việc không bị gián đoạn

## Giải thích (VI)
Dùng phạm vi gắn với ViewModel: mọi coroutine trong đó tự huỷ khi ViewModel bị xoá . Phạm vi toàn cục không bao giờ bị huỷ, nên nó giữ tham chiếu và tiếp tục chạy sau khi màn hình đã đóng.

### Giải thích các phương án:
- **Phạm vi tạo mới trong mỗi hàm cần dùng** (Sai): Không ai quản lý việc huỷ nên dễ rò rỉ.
- **Phạm vi gắn với Activity đang hiển thị** (Sai): ViewModel không nên biết tới Activity.
- **Phạm vi gắn với ViewModel, tự huỷ khi bị xoá** (Đúng): Không có phạm vi gắn vòng đời thì coroutine sống tiếp sau khi màn hình đóng và tiếp tục giữ tham chiếu.
- **Phạm vi toàn cục để công việc không bị gián đoạn** (Sai): Công việc sẽ không bao giờ bị huỷ và giữ tham chiếu ngoài vòng đời.
