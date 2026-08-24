---
id: quiz-csharp-goi-stoupper-hoac-sreplace-tren-mot-bien-string-trong-c-co-lam-thay-doi-chuoi-go
position: backend
technology: csharp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Gọi s.ToUpper() hoặc s.Replace(...) trên một biến string trong C# có làm thay đổi chuỗi gốc không?

## Đáp án trắc nghiệm
- [ ] Tuỳ chuỗi được khai báo bằng var hay string
- [ ] Có — method gọi trên biến nào thì sửa trực tiếp nội dung biến đó
- [x] Không — string là immutable, các method này trả về chuỗi mới
- [ ] Chỉ thay đổi chuỗi gốc khi chuỗi được đánh dấu readonly

## Giải thích (VI)
Không. string trong C# là immutable — nội dung không bao giờ đổi sau khi tạo. ToUpper(), Replace(), Trim()... đều trả về chuỗi mới ; muốn giữ kết quả phải gán lại: s = s.ToUpper(). Immutability giúp string an toàn khi chia sẻ giữa các thread và cho phép interning. Ghép chuỗi nhiều lần trong vòng lặp nên dùng StringBuilder.

### Giải thích các phương án:
- **Tuỳ chuỗi được khai báo bằng var hay string** (Sai): var chỉ là suy luận kiểu lúc biên dịch — biến vẫn có kiểu string với hành vi immutable y hệt.
- **Có — method gọi trên biến nào thì sửa trực tiếp nội dung biến đó** (Sai): Nội dung một string không bao giờ thay đổi sau khi tạo; s.ToUpper() không đụng tới s, nó tạo và trả về chuỗi mới.
- **Không — string là immutable, các method này trả về chuỗi mới** (Đúng): Docs .NET nêu rõ string là immutable: mọi method "sửa" chuỗi thực chất trả về string mới; quên gán lại (s = s.ToUpper()) là lỗi người mới rất hay gặp. Phải gán lại kết quả (s = s.ToUpper()) thì mới dùng được chuỗi đã đổi.
- **Chỉ thay đổi chuỗi gốc khi chuỗi được đánh dấu readonly** (Sai): readonly áp lên field (cấm gán lại sau constructor), không liên quan tới tính immutable vốn có của mọi string.
