---
id: quiz-sql-truy-van-duoi-day-tra-ve-bao-nhieu-dong
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn dưới đây trả về bao nhiêu dòng?

## Đáp án trắc nghiệm
- [ ] 3 dòng — CROSS JOIN ghép dòng theo vị trí: ('S','red'), ('M','blue'), ('L', NULL)
- [x] 6 dòng — CROSS JOIN tạo tích Descartes: mỗi dòng của sizes ghép với mọi dòng của colors, 3 × 2 = 6 tổ hợp
- [ ] Lỗi cú pháp — CROSS JOIN bắt buộc phải có mệnh đề ON như các loại JOIN khác
- [ ] 5 dòng — CROSS JOIN cộng số dòng hai bảng lại với nhau (3 + 2)

## Giải thích (VI)
Trả về 6 dòng. CROSS JOIN tạo tích Descartes: mỗi dòng bảng trái ghép với mọi dòng bảng phải, nên số dòng kết quả là 3 × 2 = 6. Đây là loại join duy nhất không có mệnh đề ON. Dùng hợp lý khi cần sinh mọi tổ hợp (ma trận size × màu); dùng nhầm trên hai bảng lớn sẽ tạo kết quả bùng nổ số dòng.

### Giải thích các phương án:
- **3 dòng — CROSS JOIN ghép dòng theo vị trí: ('S','red'), ('M','blue'), ('L', NULL)** (Sai): SQL không có khái niệm ghép theo vị trí dòng — bảng là tập hợp không có thứ tự; CROSS JOIN ghép mọi dòng với mọi dòng.
- **6 dòng — CROSS JOIN tạo tích Descartes: mỗi dòng của sizes ghép với mọi dòng của colors, 3 × 2 = 6 tổ hợp** (Đúng): Đúng: CROSS JOIN không có điều kiện ghép — kết quả luôn là tích số dòng hai bảng, ở đây 3 × 2 = 6.
- **Lỗi cú pháp — CROSS JOIN bắt buộc phải có mệnh đề ON như các loại JOIN khác** (Sai): CROSS JOIN là loại join duy nhất không nhận ON — nó không cần điều kiện ghép vì kết quả là mọi tổ hợp.
- **5 dòng — CROSS JOIN cộng số dòng hai bảng lại với nhau (3 + 2)** (Sai): Cộng số dòng là hành vi của UNION ALL, không phải CROSS JOIN — CROSS JOIN nhân số dòng vì mỗi dòng bên trái ghép với mọi dòng bên phải.
