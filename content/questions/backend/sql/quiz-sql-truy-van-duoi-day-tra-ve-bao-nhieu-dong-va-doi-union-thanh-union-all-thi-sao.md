---
id: quiz-sql-truy-van-duoi-day-tra-ve-bao-nhieu-dong-va-doi-union-thanh-union-all-thi-sao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn dưới đây trả về bao nhiêu dòng, và đổi UNION thành UNION ALL thì sao?

## Đáp án trắc nghiệm
- [ ] 4 dòng — UNION chỉ nối hai kết quả lại, không loại trùng lặp; muốn khử trùng phải dùng UNION DISTINCT ALL
- [ ] Lỗi — UNION yêu cầu hai truy vấn phải đọc từ cùng một bảng
- [x] 3 dòng ('Hanoi', 'Hue', 'Danang') — UNION loại bỏ trùng lặp trên toàn kết quả gộp; UNION ALL giữ nguyên cả 4 dòng
- [ ] 1 dòng ('Hue') — UNION trả về phần giao của hai kết quả

## Giải thích (VI)
UNION trả 3 dòng: 'Hanoi', 'Hue', 'Danang' — nó khử trùng lặp trên toàn kết quả gộp ('Hue' có ở cả hai bảng chỉ còn một). UNION ALL trả đủ 4 dòng vì bỏ bước khử trùng. Khi biết chắc dữ liệu không trùng hoặc trùng lặp chấp nhận được, dùng UNION ALL — nhanh hơn vì tránh được bước sắp xếp/băm để so trùng.

### Giải thích các phương án:
- **4 dòng — UNION chỉ nối hai kết quả lại, không loại trùng lặp; muốn khử trùng phải dùng UNION DISTINCT ALL** (Sai): Ngược lại: UNION mặc định là UNION DISTINCT — khử trùng; UNION ALL mới là dạng giữ nguyên mọi dòng, và không tồn tại cú pháp UNION DISTINCT ALL.
- **Lỗi — UNION yêu cầu hai truy vấn phải đọc từ cùng một bảng** (Sai): UNION chỉ yêu cầu hai truy vấn có cùng số cột với kiểu tương thích — đọc từ bảng nào không quan trọng.
- **3 dòng ('Hanoi', 'Hue', 'Danang') — UNION loại bỏ trùng lặp trên toàn kết quả gộp; UNION ALL giữ nguyên cả 4 dòng** (Đúng): Đúng: 'Hue' xuất hiện ở cả hai bảng nhưng UNION khử trùng chỉ còn một; UNION ALL bỏ bước khử trùng nên trả đủ 4 dòng.
- **1 dòng ('Hue') — UNION trả về phần giao của hai kết quả** (Sai): Phần giao là phép INTERSECT — UNION là phép hợp: gộp mọi dòng của cả hai truy vấn rồi khử trùng.
