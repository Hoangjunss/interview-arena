---
id: quiz-cs-fundamentals-cau-java-truyen-tham-chieu-cho-object-sai-o-diem-nao
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Câu "Java truyền tham chiếu cho object" sai ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Câu đó chỉ sai với String vì String là kiểu bất biến
- [ ] Java truyền tham chiếu nhưng tham chiếu là bất biến nên không gán lại được
- [x] Java luôn truyền theo giá trị; với object thì copy chính tham chiếu
- [ ] Java truyền tham chiếu cho object nhưng truyền giá trị cho kiểu nguyên thuỷ

## Giải thích (VI)
Java chỉ có truyền theo giá trị. Khi truyền object, thứ được copy là tham chiếu chứ không phải object. Vì vậy sửa trường của object bên trong hàm thì bên ngoài thấy, nhưng gán tham số cho một object mới thì biến ở nơi gọi vẫn trỏ object cũ. Cách gọi đúng là "pass reference by value".

### Giải thích các phương án:
- **Câu đó chỉ sai với String vì String là kiểu bất biến** (Sai): Tính bất biến của String là chuyện khác; quy tắc truyền theo giá trị áp dụng đồng nhất cho mọi kiểu tham chiếu, kể cả các lớp có thể thay đổi.
- **Java truyền tham chiếu nhưng tham chiếu là bất biến nên không gán lại được** (Sai): Tham chiếu trong Java gán lại được bình thường; vấn đề nằm ở chỗ việc gán lại chỉ tác động lên bản sao cục bộ của tham chiếu.
- **Java luôn truyền theo giá trị; với object thì copy chính tham chiếu** (Đúng): Tham chiếu được sao chép vào tham số nên hai bên trỏ cùng object (đổi trường thì thấy chung), nhưng gán tham số sang object khác chỉ đổi bản sao cục bộ.
- **Java truyền tham chiếu cho object nhưng truyền giá trị cho kiểu nguyên thuỷ** (Sai): Cách mô tả này không giải thích được vì sao gán lại tham số object bên trong hàm không hề ảnh hưởng biến gốc ở nơi gọi.
