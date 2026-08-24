---
id: quiz-golang-chia-so-nguyen-voi-so-am-doan-code-sau-in-ra-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chia số nguyên với số âm — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 3.5 3.5
- [ ] 3 4
- [x] 3 3
- [ ] 4 3

## Giải thích (VI)
In 3 rồi -3. Hai số nguyên chia nhau là chia nguyên; Go cắt phần thập phân HƯỚNG VỀ 0 (truncate toward zero), nên 7/2 = 3 và -7/2 = -3 — khác Python vốn làm tròn xuống (-4). Muốn kết quả float phải cho ít nhất một toán hạng là float. (FREE)

### Giải thích các phương án:
- **3.5 3.5** (Sai): Sai — không có toán hạng nào là float, nên đây là phép chia nguyên, kết quả bị cắt phần thập phân.
- **3 4** (Sai): Sai — -4 là kết quả LÀM TRÒN XUỐNG (floor, như Python). Go cắt về phía 0, cho -3.
- **3 3** (Đúng): Cả hai toán hạng là số nguyên nên / là chia nguyên: 7/2 = 3. Go cắt (truncate) HƯỚNG VỀ 0, nên -7/2 = -3 (không phải làm tròn xuống).
- **4 3** (Sai): Sai — 7/2 cắt về 0 thành 3, không phải làm tròn lên 4.
