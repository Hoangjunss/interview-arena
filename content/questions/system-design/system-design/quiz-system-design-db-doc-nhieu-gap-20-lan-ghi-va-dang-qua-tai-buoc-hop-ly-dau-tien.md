---
id: quiz-system-design-db-doc-nhieu-gap-20-lan-ghi-va-dang-qua-tai-buoc-hop-ly-dau-tien
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
DB đọc nhiều gấp 20 lần ghi và đang quá tải. Bước hợp lý đầu tiên?

## Đáp án trắc nghiệm
- [ ] Chuyển sang một cơ sở dữ liệu NoSQL cho nhanh hơn
- [ ] Tăng cấu hình máy lên gấp đôi mỗi lần chạm giới hạn tài nguyên
- [ ] Sharding dữ liệu ra nhiều cluster ngay từ đầu
- [x] Thêm read replica rồi chuyển truy vấn đọc sang

## Giải thích (VI)
Trước cả replica: kiểm tra index và truy vấn chậm — phần lớn "DB quá tải" là vài truy vấn thiếu index. Sau đó thêm read replica cho tải đọc, và cache cho các truy vấn lặp lại. Sharding là bước cuối.

### Giải thích các phương án:
- **Chuyển sang một cơ sở dữ liệu NoSQL cho nhanh hơn** (Sai): Đổi công nghệ không giải quyết truy vấn kém hay thiếu index.
- **Tăng cấu hình máy lên gấp đôi mỗi lần chạm giới hạn tài nguyên** (Sai): Có tác dụng ngắn hạn nhưng chi phí tăng nhanh và có trần cứng.
- **Sharding dữ liệu ra nhiều cluster ngay từ đầu** (Sai): Phức tạp nhất trong các lựa chọn và chỉ cần khi ghi hoặc dung lượng mới là vấn đề.
- **Thêm read replica rồi chuyển truy vấn đọc sang** (Đúng): Giải quyết đúng phần đang nghẽn mà không phải thay đổi mô hình dữ liệu.
