---
id: quiz-javascript-arrayprototypefilter-lam-gi-voi-mang-goc-va-tra-ve-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Array.prototype.filter() làm gì với mảng gốc và trả về gì?

## Đáp án trắc nghiệm
- [ ] Xoá tại chỗ các phần tử không thoả điều kiện khỏi mảng gốc
- [x] Trả về một mảng MỚI gồm các phần tử mà callback trả về truthy; mảng gốc giữ nguyên
- [ ] Trả về true/false cho biết có phần tử nào thoả điều kiện hay không
- [ ] Trả về phần tử ĐẦU TIÊN thoả điều kiện, hoặc undefined nếu không có

## Giải thích (VI)
filter() chạy callback trên từng phần tử và trả về mảng mới chứa các phần tử mà callback trả truthy — mảng gốc không đổi . Ví dụ [1,2,3,4].filter(n => n % 2 === 0) cho [2, 4]. Không có phần tử nào thoả thì trả mảng rỗng []. Cần một phần tử đầu tiên thì dùng find, cần boolean thì dùng some.

### Giải thích các phương án:
- **Xoá tại chỗ các phần tử không thoả điều kiện khỏi mảng gốc** (Sai): filter không sửa mảng gốc; muốn xoá tại chỗ phải dùng splice hoặc gán lại biến bằng kết quả filter.
- **Trả về một mảng MỚI gồm các phần tử mà callback trả về truthy; mảng gốc giữ nguyên** (Đúng): [1,2,3,4].filter(n => n % 2 === 0) trả [2, 4] và mảng gốc vẫn là [1,2,3,4] — filter không mutate.
- **Trả về true/false cho biết có phần tử nào thoả điều kiện hay không** (Sai): Đó là some; filter trả về một mảng, không phải boolean.
- **Trả về phần tử ĐẦU TIÊN thoả điều kiện, hoặc undefined nếu không có** (Sai): Đó là find; filter trả về mảng chứa TẤT CẢ phần tử thoả điều kiện (có thể rỗng).
