---
id: quiz-cs-fundamentals-tra-cuu-mot-khoa-trong-hash-table-co-do-phuc-tap-trung-binh-va-xau-nhat-la-bao-n
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tra cứu một khoá trong hash table có độ phức tạp trung bình và xấu nhất là bao nhiêu?

## Đáp án trắc nghiệm
- [ ] Trung bình O(n), xấu nhất O(n log n)
- [ ] Trung bình O(log n), xấu nhất O(n)
- [ ] Trung bình O(1), xấu nhất O(1)
- [x] Trung bình O(1), xấu nhất O(n)

## Giải thích (VI)
Trung bình O(1), xấu nhất O(n). Hàm băm tốt phân bố khoá đều nên mỗi bucket chỉ giữ vài phần tử. Khi nhiều khoá va chạm về cùng bucket, thao tác suy biến thành duyệt tuyến tính danh sách trong bucket đó.

### Giải thích các phương án:
- **Trung bình O(n), xấu nhất O(n log n)** (Sai): Đây không phải chi phí của bất kỳ thao tác tra cứu nào; O(n log n) là cận của sắp xếp dựa trên so sánh, không liên quan tới truy cập một khoá.
- **Trung bình O(log n), xấu nhất O(n)** (Sai): O(log n) là chi phí của cây tìm kiếm cân bằng, nơi mỗi bước loại bỏ một nửa không gian khoá — hash table không so sánh khoá theo thứ tự như vậy.
- **Trung bình O(1), xấu nhất O(1)** (Sai): Không có bảo đảm hằng số ở trường hợp xấu nhất: va chạm băm dồn nhiều khoá vào một bucket và chi phí tăng theo số phần tử trong bucket đó.
- **Trung bình O(1), xấu nhất O(n)** (Đúng): Hàm băm phân bố đều thì mỗi bucket giữ ít phần tử nên tra cứu là hằng số; khi mọi khoá băm về cùng một bucket, tra cứu suy biến thành duyệt tuyến tính.
