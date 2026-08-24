---
id: quiz-cs-fundamentals-trong-hash-table-load-factor-la-gi-va-vi-sao-no-anh-huong-toi-hieu-nang
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong hash table, "load factor" là gì và vì sao nó ảnh hưởng tới hiệu năng?

## Đáp án trắc nghiệm
- [ ] Số byte trung bình mà mỗi phần tử chiếm trong hash table
- [x] Tỉ lệ số phần tử trên số bucket của bảng
- [ ] Số phép so sánh trung bình mà hàm băm thực hiện cho mỗi khoá
- [ ] Tỉ lệ phần trăm số lần tra cứu trúng cache CPU

## Giải thích (VI)
Load factor = số phần tử / số bucket. Nó đo mức lấp đầy của bảng. Load factor càng cao, xác suất hai khoá rơi vào cùng bucket càng lớn, chuỗi va chạm càng dài và tra cứu càng rời xa O(1). Vượt ngưỡng (thường 0.75), hiện thực sẽ cấp bảng lớn hơn và rehash.

### Giải thích các phương án:
- **Số byte trung bình mà mỗi phần tử chiếm trong hash table** (Sai): Đó là kích thước phần tử, không phải load factor; nó không quyết định xác suất va chạm hay thời điểm rehash.
- **Tỉ lệ số phần tử trên số bucket của bảng** (Đúng): Load factor đo mức lấp đầy: vượt ngưỡng thì trung bình mỗi bucket giữ nhiều phần tử hơn, đẩy tra cứu từ hằng số về phía tuyến tính nên hiện thực sẽ rehash.
- **Số phép so sánh trung bình mà hàm băm thực hiện cho mỗi khoá** (Sai): Hàm băm tính giá trị băm chứ không so sánh khoá; chi phí của nó không đổi theo mức lấp đầy của bảng.
- **Tỉ lệ phần trăm số lần tra cứu trúng cache CPU** (Sai): Cache hit rate là chỉ số phần cứng đo lúc chạy, còn load factor là thuộc tính cấu trúc do số phần tử và số bucket quyết định.
