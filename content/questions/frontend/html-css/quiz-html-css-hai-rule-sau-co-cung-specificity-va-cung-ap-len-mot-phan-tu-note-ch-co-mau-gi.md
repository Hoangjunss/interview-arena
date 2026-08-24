---
id: quiz-html-css-hai-rule-sau-co-cung-specificity-va-cung-ap-len-mot-phan-tu-note-ch-co-mau-gi
position: frontend
technology: html-css
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hai rule sau có cùng specificity và cùng áp lên một phần tử .note. Chữ có màu gì?

## Đáp án trắc nghiệm
- [ ] blue — rule khai báo trước được ưu tiên vì đọc từ trên xuống
- [ ] Trình duyệt báo lỗi vì khai báo trùng thuộc tính
- [x] red — khi specificity bằng nhau, rule khai báo sau trong source thắng
- [ ] Không xác định — kết quả tùy trình duyệt

## Giải thích (VI)
Chữ màu red. Khi hai rule có cùng specificity , cascade phân xử bằng source order : rule xuất hiện sau trong mã nguồn (hoặc trong file CSS được load sau) thắng. Đây là lý do thứ tự import stylesheet quan trọng — file override phải đứng sau file base. Source order chỉ được xét khi specificity đã hòa; specificity khác nhau thì nó không có tiếng nói.

### Giải thích các phương án:
- **blue — rule khai báo trước được ưu tiên vì đọc từ trên xuống** (Sai): Ngược quy tắc: trình duyệt đọc từ trên xuống nhưng giá trị sau cùng cho mỗi thuộc tính mới là giá trị thắng, không phải giá trị đầu tiên.
- **Trình duyệt báo lỗi vì khai báo trùng thuộc tính** (Sai): CSS không có khái niệm lỗi trùng khai báo — ghi đè lẫn nhau là cơ chế hoạt động bình thường của cascade (và là nền tảng của utility/override class).
- **red — khi specificity bằng nhau, rule khai báo sau trong source thắng** (Đúng): Đúng quy tắc source order của cascade: cùng specificity thì khai báo xuất hiện sau (trong cùng file hoặc file được load sau) ghi đè khai báo trước.
- **Không xác định — kết quả tùy trình duyệt** (Sai): Cascade là thuật toán chuẩn hóa trong spec, mọi trình duyệt cho cùng kết quả: rule sau thắng khi specificity bằng nhau.
