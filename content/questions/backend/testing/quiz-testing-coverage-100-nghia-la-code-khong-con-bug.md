---
id: quiz-testing-coverage-100-nghia-la-code-khong-con-bug
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Coverage 100% nghĩa là code không còn bug?

## Đáp án trắc nghiệm
- [ ] Có với logic đơn giản, nhưng không đúng với code bất đồng bộ
- [ ] Không, vì luôn còn dòng code chết không đo được
- [ ] Có, vì mọi dòng đã được kiểm tra bởi ít nhất một test
- [x] Không — coverage nói dòng nào được chạy, không nói assert gì

## Giải thích (VI)
Không. Coverage đo dòng nào được thực thi, không đo bạn có assert gì. Một test gọi hàm rồi không kiểm tra gì vẫn cho 100% coverage. Nó hữu ích để tìm phần chưa được test, không phải để chứng minh chất lượng.

### Giải thích các phương án:
- **Có với logic đơn giản, nhưng không đúng với code bất đồng bộ** (Sai): Giới hạn của coverage không phụ thuộc vào việc code có bất đồng bộ hay không.
- **Không, vì luôn còn dòng code chết không đo được** (Sai): Code chết là chuyện khác, không phải lý do chính ở đây.
- **Có, vì mọi dòng đã được kiểm tra bởi ít nhất một test** (Sai): Được chạy qua không đồng nghĩa với được kiểm tra đúng sai.
- **Không — coverage nói dòng nào được chạy, không nói assert gì** (Đúng): Chạy hết mọi dòng mà không kiểm tra kết quả thì vẫn không phát hiện lỗi.
