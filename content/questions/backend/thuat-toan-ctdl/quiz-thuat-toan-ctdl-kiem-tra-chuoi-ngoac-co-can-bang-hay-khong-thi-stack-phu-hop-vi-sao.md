---
id: quiz-thuat-toan-ctdl-kiem-tra-chuoi-ngoac-co-can-bang-hay-khong-thi-stack-phu-hop-vi-sao
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm tra chuỗi ngoặc có cân bằng hay không thì stack phù hợp vì sao?

## Đáp án trắc nghiệm
- [x] Ngoặc đóng phải khớp ngoặc mở gần nhất chưa đóng
- [ ] Stack giữ các ngoặc theo thứ tự đã sắp xếp
- [ ] Stack đếm được số ngoặc mở mà không cần lưu chúng
- [ ] Stack cho phép truy cập phần tử bất kỳ trong O(1)

## Giải thích (VI)
Vì quy tắc ngoặc là vào sau ra trước : một ngoặc đóng phải khớp với ngoặc mở gần nhất còn chưa đóng, đúng ngữ nghĩa của stack. Gặp ngoặc mở thì đẩy vào, gặp ngoặc đóng thì lấy đỉnh ra so khớp. Chuỗi hợp lệ khi không lệch giữa chừng và stack rỗng lúc kết thúc.

### Giải thích các phương án:
- **Ngoặc đóng phải khớp ngoặc mở gần nhất chưa đóng** (Đúng): Đó đúng là ngữ nghĩa vào sau ra trước mà ngăn xếp cung cấp.
- **Stack giữ các ngoặc theo thứ tự đã sắp xếp** (Sai): Không có sắp xếp nào ở đây, chỉ có thứ tự vào ra.
- **Stack đếm được số ngoặc mở mà không cần lưu chúng** (Sai): Nếu chỉ đếm thì không phân biệt được ba loại ngoặc lồng sai kiểu.
- **Stack cho phép truy cập phần tử bất kỳ trong O(1)** (Sai): Ngăn xếp chỉ cho thao tác ở đỉnh, không truy cập ngẫu nhiên.
