---
id: quiz-java-phat-bieu-nao-sau-day-sai-ve-stream-api
position: backend
technology: java
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về Stream API?

## Đáp án trắc nghiệm
- [x] parallelStream() luôn nhanh hơn stream() tuần tự vì tận dụng được nhiều nhân CPU
- [ ] Stream chỉ dùng được một lần — sau khi terminal operation chạy, dùng lại stream đó ném IllegalStateException
- [ ] peek() chủ yếu để gỡ lỗi, không nên dùng để cập nhật state bên ngoài
- [ ] toList() (Java 16+) trả về list KHÔNG sửa được, khác với collect(Collectors.toList()) trả về list mutable
- [ ] Intermediate operation (filter, map, sorted...) là lazy — chỉ thực thi khi pipeline có terminal operation

## Giải thích (VI)
Ba điểm đúng: stream dùng một lần (dùng lại ném IllegalStateException); intermediate op lazy — chỉ chạy khi có terminal op; toList() (Java 16+) trả list không sửa được, khác collect(Collectors.toList()). Hai hiểu nhầm phổ biến: parallelStream() không phải lúc nào cũng nhanh hơn — chỉ đáng với dataset lớn, op stateless; peek() chỉ để debug, không dùng cho side effect nghiệp vụ.

### Giải thích các phương án:
- **parallelStream() luôn nhanh hơn stream() tuần tự vì tận dụng được nhiều nhân CPU** (Đúng): Đây là chỗ sai: parallelStream có chi phí chia việc và gộp kết quả, với dữ liệu nhỏ hoặc thao tác rẻ thì thường chậm hơn stream tuần tự.
- **Stream chỉ dùng được một lần — sau khi terminal operation chạy, dùng lại stream đó ném IllegalStateException** (Sai): Phát biểu đúng: dùng lại một stream đã tiêu thụ sẽ ném IllegalStateException.
- **peek() chủ yếu để gỡ lỗi, không nên dùng để cập nhật state bên ngoài** (Sai): Phát biểu đúng: javadoc ghi rõ peek() dành cho gỡ lỗi, và nó có thể bị bỏ qua khi pipeline được tối ưu.
- **toList() (Java 16+) trả về list KHÔNG sửa được, khác với collect(Collectors.toList()) trả về list mutable** (Sai): Phát biểu đúng: toList() trả về list bất biến, khác collect(Collectors.toList()).
- **Intermediate operation (filter, map, sorted...) là lazy — chỉ thực thi khi pipeline có terminal operation** (Sai): Phát biểu đúng: không có terminal operation thì pipeline không chạy gì cả.
