---
id: quiz-system-design-khoa-chinh-nen-dung-uuid-v4-hay-so-tu-tang-cho-bang-nhieu-trieu-dong
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khoá chính nên dùng UUID v4 hay số tự tăng cho bảng nhiều triệu dòng?

## Đáp án trắc nghiệm
- [ ] UUID v4 luôn tốt hơn vì không đoán được và không thể trùng nhau
- [ ] Số tự tăng luôn tốt hơn trong mọi trường hợp sử dụng
- [ ] Không khác biệt gì vì DB tự tối ưu index cho cả hai kiểu
- [x] Số tự tăng hoặc UUID v7 vì chúng tăng dần theo thời điểm

## Giải thích (VI)
Chọn khoá tăng dần : số tự tăng, hoặc UUID v7 nếu cần id sinh ở phía client. UUID v4 ngẫu nhiên làm mỗi lần chèn rơi vào một chỗ khác trong B-tree, gây phân mảnh và ghi nhiều page hơn.

### Giải thích các phương án:
- **UUID v4 luôn tốt hơn vì không đoán được và không thể trùng nhau** (Sai): An toàn hơn về việc đoán id nhưng trả giá bằng hiệu năng ghi và kích thước index.
- **Số tự tăng luôn tốt hơn trong mọi trường hợp sử dụng** (Sai): Nó lộ thông tin về số lượng bản ghi và khó gộp dữ liệu từ nhiều nguồn.
- **Không khác biệt gì vì DB tự tối ưu index cho cả hai kiểu** (Sai): Khác biệt đo được rõ ở tốc độ chèn và dung lượng index.
- **Số tự tăng hoặc UUID v7 vì chúng tăng dần theo thời điểm** (Đúng): Khoá tăng dần giúp index chèn vào cuối, còn UUID v4 ngẫu nhiên làm B-tree phân mảnh.
