---
id: quiz-cs-fundamentals-khac-biet-gia-vung-nho-stack-va-heap-la-gi
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khác biệt giữa vùng nhớ stack và heap là gì?

## Đáp án trắc nghiệm
- [ ] Stack dành cho dữ liệu chỉ đọc, heap dành cho dữ liệu ghi được
- [x] Stack tự thu hồi khi hàm kết thúc; heap thì không
- [ ] Stack lưu biến toàn cục còn heap lưu biến cục bộ của hàm
- [ ] Stack nằm trong RAM còn heap được cấp phát trên ổ đĩa

## Giải thích (VI)
Stack cấp phát theo khung lời gọi hàm: vào hàm thì đẩy khung, ra hàm thì thu hồi tự động, chi phí chỉ là dịch con trỏ. Heap cấp phát các khối rời rạc, vòng đời do lập trình viên hoặc garbage collector quyết định, chậm hơn và có thể phân mảnh. Biến cục bộ thường nằm ở stack, dữ liệu sống lâu hơn lời gọi hàm nằm ở heap.

### Giải thích các phương án:
- **Stack dành cho dữ liệu chỉ đọc, heap dành cho dữ liệu ghi được** (Sai): Cả hai đều ghi được; vùng chỉ đọc là nơi chứa mã máy và hằng số (text/rodata), tách riêng khỏi stack và heap.
- **Stack tự thu hồi khi hàm kết thúc; heap thì không** (Đúng): Stack chỉ dịch con trỏ theo khung hàm nên vào/ra là hằng số và tự động; heap quản lý các khối rời rạc với vòng đời không gắn với lời gọi hàm.
- **Stack lưu biến toàn cục còn heap lưu biến cục bộ của hàm** (Sai): Ngược hẳn về biến cục bộ: chúng nằm trên stack. Biến toàn cục nằm ở vùng dữ liệu tĩnh, không thuộc cả stack lẫn heap.
- **Stack nằm trong RAM còn heap được cấp phát trên ổ đĩa** (Sai): Cả hai đều là vùng trong không gian địa chỉ ảo của tiến trình; việc trang nhớ có bị hoán đổi ra đĩa hay không do hệ điều hành quyết định, không phân biệt theo stack/heap.
