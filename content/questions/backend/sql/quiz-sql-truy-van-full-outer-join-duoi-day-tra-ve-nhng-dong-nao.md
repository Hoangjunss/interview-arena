---
id: quiz-sql-truy-van-full-outer-join-duoi-day-tra-ve-nhng-dong-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn FULL OUTER JOIN dưới đây trả về những dòng nào?

## Đáp án trắc nghiệm
- [ ] 1 dòng: ('An', 'Eng') — chỉ dòng khớp ở cả hai bảng được trả về
- [x] 3 dòng: ('An', 'Eng'), ('Binh', NULL), (NULL, 'HR')
- [ ] 3 dòng: ('An', 'Eng'), ('Binh', 'HR'), (NULL, NULL) — dept id NULL của Binh được ghép với phòng ban còn trống
- [ ] 2 dòng: ('An', 'Eng'), ('Binh', NULL) — FULL OUTER JOIN chỉ giữ dòng không khớp của bảng đứng trước

## Giải thích (VI)
Trả về 3 dòng: ('An', 'Eng') — cặp khớp duy nhất; ('Binh', NULL) — Binh có dept id NULL, không khớp dòng nào vì NULL không so khớp được trong ON; (NULL, 'HR') — phòng HR không có nhân viên nào trỏ tới. FULL OUTER JOIN là hợp của LEFT và RIGHT JOIN: giữ dòng không khớp của cả hai phía, điền NULL cho phía thiếu.

### Giải thích các phương án:
- **1 dòng: ('An', 'Eng') — chỉ dòng khớp ở cả hai bảng được trả về** (Sai): Đó là kết quả của INNER JOIN — FULL OUTER JOIN khác ở chỗ giữ thêm dòng không khớp của cả hai phía.
- **3 dòng: ('An', 'Eng'), ('Binh', NULL), (NULL, 'HR')** (Đúng): Đúng: dòng khớp duy nhất là An–Eng; Binh (trái, không khớp vì NULL không so khớp được) và HR (phải, không ai trỏ tới) đều được giữ với NULL ở phía đối diện. FULL OUTER JOIN giữ cả dòng không khớp của hai phía; dept id NULL của Binh không khớp với dòng nào.
- **3 dòng: ('An', 'Eng'), ('Binh', 'HR'), (NULL, NULL) — dept id NULL của Binh được ghép với phòng ban còn trống** (Sai): NULL không khớp với bất kỳ giá trị nào trong điều kiện ON (kể cả với NULL khác) — Binh là dòng không khớp và nhận NULL ở cột dept, không được "ghép tạm" với HR.
- **2 dòng: ('An', 'Eng'), ('Binh', NULL) — FULL OUTER JOIN chỉ giữ dòng không khớp của bảng đứng trước** (Sai): Chỉ giữ phía trái là hành vi của LEFT JOIN — FULL OUTER JOIN giữ dòng không khớp của cả hai phía, nên HR cũng xuất hiện.
