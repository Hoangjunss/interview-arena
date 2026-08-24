---
id: quiz-android-kotlin-truy-van-room-tra-ve-flow-co-loi-the-gi-so-voi-tra-ve-danh-sach
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn Room trả về Flow có lợi thế gì so với trả về danh sách?

## Đáp án trắc nghiệm
- [ ] Không cần khai báo kiểu trả về trong lớp truy cập
- [ ] Truy vấn tự động chạy trên main thread an toàn
- [x] Giao diện tự cập nhật khi dữ liệu trong bảng đổi
- [ ] Truy vấn chạy nhanh hơn nhờ được cache

## Giải thích (VI)
Truy vấn trả về Flow được Room phát lại mỗi khi bảng liên quan thay đổi , nên giao diện tự cập nhật sau khi ghi mà không phải gọi lại truy vấn. Đây là cách làm cho cơ sở dữ liệu trở thành nguồn sự thật duy nhất.

### Giải thích các phương án:
- **Không cần khai báo kiểu trả về trong lớp truy cập** (Sai): Kiểu trả về vẫn phải khai báo.
- **Truy vấn tự động chạy trên main thread an toàn** (Sai): Room vốn chặn truy vấn đồng bộ trên luồng chính bất kể kiểu trả về.
- **Giao diện tự cập nhật khi dữ liệu trong bảng đổi** (Đúng): Room theo dõi bảng liên quan và phát lại kết quả nên không cần tự gọi lại truy vấn.
- **Truy vấn chạy nhanh hơn nhờ được cache** (Sai): Tốc độ truy vấn không đổi.
