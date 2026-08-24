---
id: quiz-security-api-gap-loi-nen-tra-ve-thong-tin-gi-cho-client
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
API gặp lỗi, nên trả về thông tin gì cho client?

## Đáp án trắc nghiệm
- [ ] Câu truy vấn đã thất bại để dễ tìm nguyên nhân
- [x] Thông báo ngắn kèm mã lỗi, chi tiết ghi vào log
- [ ] Toàn bộ stack trace để client dễ báo lỗi cho dev
- [ ] Chỉ trả mã trạng thái, không kèm thông báo nào cả

## Giải thích (VI)
Một thông báo ngắn, không tiết lộ nội bộ cùng mã lỗi để client xử lý, và một id lỗi để đối chiếu. Stack trace, câu SQL, tên tệp, phiên bản thư viện thì chỉ ghi vào log phía server.

### Giải thích các phương án:
- **Câu truy vấn đã thất bại để dễ tìm nguyên nhân** (Sai): Tiết lộ cấu trúc bảng và cột, rất hữu ích cho kẻ tấn công.
- **Thông báo ngắn kèm mã lỗi, chi tiết ghi vào log** (Đúng): Stack trace và câu SQL lộ ra giúp kẻ tấn công hiểu cấu trúc hệ thống.
- **Toàn bộ stack trace để client dễ báo lỗi cho dev** (Sai): Lộ đường dẫn tệp, thư viện và phiên bản đang dùng.
- **Chỉ trả mã trạng thái, không kèm thông báo nào cả** (Sai): An toàn nhưng client không biết vì sao lỗi để xử lý đúng.
