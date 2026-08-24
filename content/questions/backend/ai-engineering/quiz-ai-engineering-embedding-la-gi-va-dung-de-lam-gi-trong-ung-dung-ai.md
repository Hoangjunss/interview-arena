---
id: quiz-ai-engineering-embedding-la-gi-va-dung-de-lam-gi-trong-ung-dung-ai
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Embedding là gì và dùng để làm gì trong ứng dụng AI?

## Đáp án trắc nghiệm
- [ ] Đoạn mã nhúng để gắn chatbot vào website
- [ ] Bản nén của văn bản, giải nén lại được nguyên văn khi cần
- [x] Vector số biểu diễn ngữ nghĩa; nghĩa gần nhau thì vector gần nhau
- [ ] Bộ trọng số của model sau khi fine-tune trên dữ liệu riêng của công ty

## Giải thích (VI)
Embedding là vector số (thường vài trăm tới vài nghìn chiều) biểu diễn ý nghĩa của văn bản. Văn bản gần nghĩa cho vector gần nhau, đo bằng cosine similarity. Nhờ đó tìm được "hoàn tiền thế nào" khi tài liệu viết "chính sách hoàn trả" — điều mà tìm theo từ khóa không làm được.

### Giải thích các phương án:
- **Đoạn mã nhúng để gắn chatbot vào website** (Sai): Đó là embed script, trùng tên nhưng khác khái niệm.
- **Bản nén của văn bản, giải nén lại được nguyên văn khi cần** (Sai): Embedding mất mát thông tin và không khôi phục lại văn bản gốc được.
- **Vector số biểu diễn ngữ nghĩa; nghĩa gần nhau thì vector gần nhau** (Đúng): Đây là nền tảng của tìm kiếm ngữ nghĩa và của RAG — tìm được theo ý nghĩa thay vì theo từ khoá.
- **Bộ trọng số của model sau khi fine-tune trên dữ liệu riêng của công ty** (Sai): Trọng số model là thứ khác; embedding là biểu diễn của dữ liệu đầu vào.
