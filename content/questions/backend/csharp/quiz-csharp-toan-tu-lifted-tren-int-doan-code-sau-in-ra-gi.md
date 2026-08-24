---
id: quiz-csharp-toan-tu-lifted-tren-int-doan-code-sau-in-ra-gi
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Toán tử lifted trên int? — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] True 5
- [ ] False 0
- [x] False 1
- [ ] True 1

## Giải thích (VI)
In False rồi -1. Với kiểu nullable value (int?), toán tử số học được "lifted": chỉ cần một toán hạng là null thì kết quả là null. Do đó null + 5 = null, khiến sum.HasValue là False. Sau đó sum ?? -1 gặp null nên lấy nhánh phải → -1. null trong số học nullable KHÔNG được coi là 0.

### Giải thích các phương án:
- **True 5** (Sai): Sai — a là null nên a + b không cộng 0 + 5 = 5; toán tử lifted trả về null khi có toán hạng null, nên HasValue là False.
- **False 0** (Sai): Sai — null được coi là 0 chỉ trong vài context khác; ở phép + nullable, kết quả là null, và null ?? -1 cho -1 chứ không phải 0.
- **False 1** (Đúng): Toán tử số học được "lifted" cho nullable: nếu một toán hạng là null thì kết quả là null. Vậy null + 5 = null → sum.HasValue là False; và sum ?? -1 lấy nhánh phải → -1.
- **True 1** (Sai): Sai — vì sum là null nên HasValue phải là False, không phải True.
