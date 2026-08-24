---
id: quiz-cs-fundamentals-vi-sao-moi-thuat-toan-sap-xep-dua-tren-so-sanh-deu-khong-the-nhanh-hon-on-log-n
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao mọi thuật toán sắp xếp dựa trên so sánh đều không thể nhanh hơn O(n log n) ở trường hợp xấu nhất?

## Đáp án trắc nghiệm
- [ ] Vì truy cập bộ nhớ ngẫu nhiên khiến cache miss tăng theo log n
- [x] Vì cần phân biệt n! hoán vị, mỗi so sánh chỉ loại được một nửa khả năng
- [ ] Vì thuật toán chia để trị luôn phải chia mảng thành hai nửa
- [ ] Vì phải đọc hết n phần tử, mỗi phần tử cần log n bit để lưu chỉ số của nó

## Giải thích (VI)
Vì cận dưới lý thuyết thông tin. Với n phần tử có n! thứ tự khả dĩ; mỗi phép so sánh cho một bit thông tin nên loại nhiều nhất một nửa số khả năng. Cần ít nhất log₂(n!) phép so sánh, và theo xấp xỉ Stirling log₂(n!) = Θ(n log n).

### Giải thích các phương án:
- **Vì truy cập bộ nhớ ngẫu nhiên khiến cache miss tăng theo log n** (Sai): Cache là yếu tố hằng số trong thực tế, không tạo ra cận dưới tiệm cận; cận dưới n log n đúng cả trên mô hình máy tính lý thuyết không có cache.
- **Vì cần phân biệt n! hoán vị, mỗi so sánh chỉ loại được một nửa khả năng** (Đúng): Đây là cận dưới lý thuyết thông tin: cây quyết định phân biệt n! kết quả phải có chiều cao tối thiểu log₂(n!), và theo xấp xỉ Stirling giá trị này là Θ(n log n).
- **Vì thuật toán chia để trị luôn phải chia mảng thành hai nửa** (Sai): Chia đôi là đặc điểm của merge sort, không phải ràng buộc chung; cận dưới áp cho mọi thuật toán so sánh kể cả loại không chia để trị như heapsort.
- **Vì phải đọc hết n phần tử, mỗi phần tử cần log n bit để lưu chỉ số của nó** (Sai): Số bit lưu chỉ số là chi tiết biểu diễn dữ liệu, không liên quan tới số phép so sánh tối thiểu cần thực hiện để xác định thứ tự.
