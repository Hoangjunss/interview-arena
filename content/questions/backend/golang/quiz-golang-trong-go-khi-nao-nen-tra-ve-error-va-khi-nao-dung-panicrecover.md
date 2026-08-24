---
id: quiz-golang-trong-go-khi-nao-nen-tra-ve-error-va-khi-nao-dung-panicrecover
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trong Go, khi nào nên trả về error và khi nào dùng panic/recover?

## Đáp án trắc nghiệm
- [ ] Luôn dùng panic thay cho error vì gọn hơn
- [ ] recover có thể gọi ở bất kỳ đâu để bỏ qua mọi lỗi runtime
- [ ] error chỉ dùng cho lỗi mạng, mọi lỗi khác phải panic
- [x] Trả về error cho lỗi dự kiến trong luồng bình thường

## Giải thích (VI)
Go coi lỗi là giá trị: hàm trả error ở vị trí cuối và caller kiểm tra if err != nil. Dùng error cho mọi thất bại dự kiến (I/O, parse, validate). Chỉ panic khi gặp bug hoặc bất biến bị phá vỡ không thể tiếp tục; recover đặt trong defer để chặn panic tại ranh giới, tránh sập cả tiến trình.

### Giải thích các phương án:
- **Luôn dùng panic thay cho error vì gọn hơn** (Sai): Sai idiom Go. panic lan ngược stack và làm sập chương trình nếu không recover; nó không phải cơ chế báo lỗi thường quy.
- **recover có thể gọi ở bất kỳ đâu để bỏ qua mọi lỗi runtime** (Sai): recover chỉ có tác dụng khi được gọi trực tiếp trong một hàm defer đang xử lý panic; gọi ngoài ngữ cảnh đó trả về nil và không chặn được gì.
- **error chỉ dùng cho lỗi mạng, mọi lỗi khác phải panic** (Sai): Không có quy tắc như vậy; error là kênh chuẩn cho mọi thất bại dự kiến, không giới hạn ở lỗi mạng.
- **Trả về error cho lỗi dự kiến trong luồng bình thường** (Đúng): Chỉ dùng panic cho lỗi lập trình / trạng thái không thể phục hồi, và recover để chặn panic ở ranh giới. Go coi lỗi là giá trị: hàm trả error cho các thất bại thường gặp (I/O, parse...). panic dành cho bug/bất biến bị vi phạm; recover (trong defer) chỉ để không sập cả tiến trình tại ranh giới như handler.
