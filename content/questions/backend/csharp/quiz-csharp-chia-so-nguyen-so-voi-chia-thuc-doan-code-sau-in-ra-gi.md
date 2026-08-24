---
id: quiz-csharp-chia-so-nguyen-so-voi-chia-thuc-doan-code-sau-in-ra-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chia số nguyên so với chia thực — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] 4 3.5
- [ ] 3.5 3.5
- [x] 3 3.5
- [ ] 3 3

## Giải thích (VI)
In 3 rồi 3.5. 7 / 2 có hai toán hạng đều là int nên C# chia số nguyên, cắt bỏ phần dư → 3. 7.0 / 2 có 7.0 là double nên toàn bộ phép chia được nâng lên double → 3.5. Kiểu của toán hạng quyết định loại phép chia, không phải kiểu biến nhận kết quả.

### Giải thích các phương án:
- **4 3.5** (Sai): Sai — chia số nguyên cắt bỏ phần thập phân (truncate về 0), không làm tròn nên 7/2 = 3 chứ không phải 4.
- **3.5 3.5** (Sai): Sai — 7 / 2 có cả hai toán hạng int nên C# thực hiện chia số nguyên, không ra 3.5.
- **3 3.5** (Đúng): 7 / 2: cả hai toán hạng đều là int nên là phép chia số nguyên → 3. 7.0 / 2: 7.0 là double nên phép chia là double → 3.5.
- **3 3** (Sai): Sai — 7.0 / 2 có một toán hạng double nên kết quả là double 3.5, không phải 3.
