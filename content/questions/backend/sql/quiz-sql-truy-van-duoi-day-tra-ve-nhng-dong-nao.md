---
id: quiz-sql-truy-van-duoi-day-tra-ve-nhng-dong-nao
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn dưới đây trả về những dòng nào?

## Đáp án trắc nghiệm
- [ ] 2 dòng: ('An', 'paid') và ('Binh', NULL) — LEFT JOIN luôn giữ mọi dòng bảng trái bất kể WHERE
- [ ] Lỗi cú pháp — điều kiện lọc bảng phải bắt buộc phải nằm trong mệnh đề ON
- [x] Chỉ 1 dòng ('An', 'paid')
- [ ] 0 dòng — không thể dùng WHERE trên cột của bảng phải sau LEFT JOIN, PostgreSQL bỏ qua toàn bộ kết quả

## Giải thích (VI)
Trả về đúng 1 dòng ('An', 'paid'). Dòng của Binh sau LEFT JOIN có o.status = NULL; điều kiện WHERE o.status = 'paid' so sánh với NULL cho kết quả không xác định nên dòng bị loại — LEFT JOIN thực tế trở thành INNER JOIN. Muốn giữ Binh với status NULL, chuyển điều kiện vào ON: LEFT JOIN orders o ON o.customer id = c.id AND o.status = 'paid'.

### Giải thích các phương án:
- **2 dòng: ('An', 'paid') và ('Binh', NULL) — LEFT JOIN luôn giữ mọi dòng bảng trái bất kể WHERE** (Sai): LEFT JOIN giữ dòng không khớp ở bước join, nhưng WHERE chạy sau join và vẫn lọc được các dòng đó — muốn giữ Binh phải chuyển điều kiện vào ON.
- **Lỗi cú pháp — điều kiện lọc bảng phải bắt buộc phải nằm trong mệnh đề ON** (Sai): Không có lỗi nào — đặt điều kiện ở WHERE hay ON đều hợp lệ; khác biệt chỉ nằm ở ngữ nghĩa kết quả.
- **Chỉ 1 dòng ('An', 'paid')** (Đúng): Đúng: dòng của Binh sau LEFT JOIN có o.status = NULL; so sánh NULL = 'paid' cho kết quả không xác định nên WHERE loại dòng đó. Điều kiện WHERE trên cột bảng phải loại dòng của Binh vì o.status là NULL, khiến LEFT JOIN hoạt động như INNER JOIN.
- **0 dòng — không thể dùng WHERE trên cột của bảng phải sau LEFT JOIN, PostgreSQL bỏ qua toàn bộ kết quả** (Sai): WHERE trên cột bảng phải hoàn toàn hợp lệ về cú pháp; dòng của An khớp điều kiện nên vẫn được trả về.
