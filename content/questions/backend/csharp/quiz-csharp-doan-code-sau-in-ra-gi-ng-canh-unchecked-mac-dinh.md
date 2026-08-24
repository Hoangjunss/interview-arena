---
id: quiz-csharp-doan-code-sau-in-ra-gi-ng-canh-unchecked-mac-dinh
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đoạn code sau in ra gì (ngữ cảnh unchecked mặc định)?

## Đáp án trắc nghiệm
- [ ] 2147483648
- [x] 2147483648
- [ ] 2147483647
- [ ] Ném OverflowException

## Giải thích (VI)
In -2147483648. Mặc định C# biên dịch ở ngữ cảnh unchecked, nên số học int khi tràn sẽ cuộn vòng (wrap-around) theo số bù hai thay vì báo lỗi. int.MaxValue là 2147483647; cộng 1 vượt trần nên quấn xuống int.MinValue = -2147483648. Muốn bắt lỗi tràn, bọc bằng checked { ... } để nhận OverflowException.

### Giải thích các phương án:
- **2147483648** (Sai): Sai — kết quả không tự nâng lên long. Phép cộng vẫn là int + int, tràn khỏi phạm vi int nên cuộn vòng về số âm.
- **2147483648** (Đúng): Mặc định C# dùng ngữ cảnh unchecked: số học int tràn thì cuộn vòng (wrap-around) theo bù hai. int.MaxValue (2147483647) + 1 vượt trần nên quấn về int.MinValue = -2147483648, không ném exception.
- **2147483647** (Sai): Sai — giá trị không bị "kẹp" (clamp) ở giá trị max; nó cuộn vòng qua giá trị âm nhỏ nhất.
- **Ném OverflowException** (Sai): Sai trong ngữ cảnh mặc định — chỉ khi bọc bằng checked { } (hoặc bật /checked) thì mới ném OverflowException. Mặc định là unchecked.
